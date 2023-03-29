import { ShopCar } from "@src/components/ShopCar";
import { PageView } from "@src/lib/components/layout/PageView";
import { Navigation } from "@src/utils/Navigation";
import { NutMenu } from "./components/menu";
import { NutTabs } from "./components/tabs";
import { GoodsItemProps, SelectGoodsProps } from "./model";
import { usePresenter } from "./presenter";
import { calculateTotal } from "./utils";
import { usePresenter as userPresenter } from "@src/moduels/user/usePresenter";

const Index = () => {
  const { model } = usePresenter();
  const { model: userModel } = userPresenter();
  const { total, expand, selectGoods,loading } = model.state;
  const goods = [
    {
      id: "1",
      price: 6.6,
    },
    {
      id: "2",
      price: 7.6,
    },
    {
      id: "3",
      price: 8.6,
    },
  ];
  const selectGoodsHandel = (item: GoodsItemProps, type: string) => {
    const newData = [...selectGoods];
    const index = selectGoods.findIndex(el => item.id === el.id);
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

  return (
    <PageView tabBarPlaceholder loading={!userModel.state.token || loading }>
      {userModel.state.token && (
        <PageView.Content>
          <NutMenu></NutMenu>
          <NutTabs
            goods={goods}
            total={total}
            onSelect={(value, type) => {
              selectGoodsHandel(value, type);
            }}
          ></NutTabs>
          <ShopCar
            price={total}
            expand={expand}
            onClick={() => {
              Navigation.navigateTo("/pages/order/index");
            }}
          ></ShopCar>
        </PageView.Content>
      )}
    </PageView>
  );
};

export default Index;
