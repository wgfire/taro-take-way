import { getResidentialList } from "@src/apis/residential/get-residential-list";
import { GoodsItemProps, SelectGoodsProps, useModel } from "./model";
import { calculateTotal } from "./utils";

export const usePresenter = () => {
  const model = useModel();

  const getResidentialListData = async () => {
    const { data } = await getResidentialList();
    console.log(data, "地区");
  };

  const selectGoodsHandel = (item: GoodsItemProps, type: string) => {
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
    model.setState({
      total: newTotal,
      expand: newTotal !== 0,
      selectGoods: newSelectGoods,
    });
  };
  return { model, selectGoodsHandel };
};
