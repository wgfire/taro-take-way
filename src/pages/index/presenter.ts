import { getMenuGoodsList, GoodsItemProps } from "@src/apis/goods/get-goods-list";
import { SelectGoodsProps, useModel } from "./model";
import { calculateTotal } from "./utils";
import { addShopCarData, getShopCarData } from "@src/apis/goods/set-goods";
import Taro from "@tarojs/taro";
import { StringUtil } from "@src/lib/utils/StringUtil";

export const usePresenter = () => {
  const model = useModel();

  const getData = async () => {
    try {
      Taro.showLoading({ title: "加载中" });
      model.setState({
        loading: true,
      });

      const { data } = await getMenuGoodsList();
      const { data: shopData } = await getShopCarData();
      console.log(data, "商品", shopData, "购物车");
      const selectGoods: SelectGoodsProps[] = [];
      if (shopData.goodsVOS) {
        data.goodsVOS.forEach(el => {
          const flag = shopData.goodsVOS.find((item: any) => {
            return el.id === item.goodsId;
          });
          if (flag) {
            selectGoods.push({ ...el, num: flag.quantity });
          }
        });
      }

      model.setState({
        goodsData: data.goodsVOS
          ? data.goodsVOS.map(el => {
              return { ...el, unid: StringUtil.uniqueId() };
            })
          : [],
        menuData: data.menuVOS
          ? data.menuVOS.map(el => {
              return { ...el, unid: StringUtil.uniqueId() };
            })
          : [],
        selectGoods,
        expand: selectGoods.length > 0,
        total: shopData.totalPrice ?? 0,
      });
    } finally {
      model.setState({
        loading: false,
      });
      Taro.hideLoading();
    }
  };

  const selectGoodsHandel = async (item: GoodsItemProps, type: string) => {
    const result = await addShopCarData({ goodsId: item.id, operation: type === "add" ? 1 : -1 });
    if (result.code !== 1000) return false;
    const newData = [...model.state.selectGoods];
    const index = model.state.selectGoods.findIndex(el => item.id === el.id);
    const data = newData[index];
    const select = { num: data ? data.num : 1, ...item } as SelectGoodsProps;
    if (data) {
      select.num = type === "add" ? select.num + 1 : select.num - 1;
      newData[index] = select;
    } else {
      newData.push(select);
    }
    const newSelectGoods = newData.filter(selectItem => selectItem.num > 0);
    const newTotal = calculateTotal(newSelectGoods);
    return model.setState({
      total: newTotal,
      expand: newTotal !== 0,
      selectGoods: newSelectGoods,
    });
  };
  const selectGoodsTotal = () => {
    let total = 0;

    total = model.state.selectGoods.reduce((pre, curr) => {
      return pre + curr.num;
    }, 0);
    return total;
  };
  return { model, selectGoodsHandel, getData, selectGoodsTotal };
};
