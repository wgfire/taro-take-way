import { getMenuGoodsList, GoodsItemProps } from "@src/apis/goods/get-goods-list";
import { bindResidentialList } from "@src/apis/residential/bind-residential";
import { SelectGoodsProps, useModel } from "./model";
import { calculateTotal } from "./utils";

export const usePresenter = () => {
  const model = useModel();

  const getMenuGoodsListData = async () => {
    try {
      model.setState({
        loading: true,
      });
      const { data } = await getMenuGoodsList();
      console.log(data, "商品");
    } finally {
      model.setState({
        loading: false,
      });
    }
  };

  const getData = async (id: number) => {
    try {
      model.setState({
        loading: true,
      });
      await bindResidentialList({
        id,
      });
      const { data } = await getMenuGoodsList();
      console.log(data, "商品");
      model.setState({
        goodsData: data.goodsVOS,
        menuData: data.menuVOS,
      });
    } finally {
      model.setState({
        loading: false,
      });
    }
  };
  const selectGoodsHandel = (item: GoodsItemProps, type: string) => {
    const newData = [...model.state.selectGoods];
    const index = model.state.selectGoods.findIndex(el => item.menuId === el.menuId);
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
    model.setState({
      total: newTotal,
      expand: newTotal !== 0,
      selectGoods: newSelectGoods,
    });
  };
  return { model, selectGoodsHandel, getMenuGoodsListData, getData };
};
