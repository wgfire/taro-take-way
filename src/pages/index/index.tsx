import { ShopCar } from "@src/components/ShopCar";
import { PageView } from "@src/lib/components/layout/PageView";
import { Navigation } from "@src/utils/Navigation";
import { eventCenter } from "@tarojs/taro";
import { useEffect, useState } from "react";

import { NutMenu } from "./components/menu";
import { NutTabs } from "./components/tabs";
import { GoodsData, GoodsItemProps, SelectGoodsProps } from "./model";
import { calculateTatal } from "./utils";

const Index = () => {
  const [total, setTotal] = useState(0);
  const [expand, setExpand] = useState(false);
  const [selectGood, setSelectGood] = useState<Array<SelectGoodsProps>>([]);

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
    const newData = [...selectGood];
    const index = selectGood.findIndex(el => item.id === el.id);
    const data = newData[index];
    const select = { num: data ? data.num : 1, ...item } as SelectGoodsProps;
    if (data) {
      select.num = type === "add" ? select.num + 1 : select.num - 1;
      newData[index] = select;
    } else {
      newData.push(select);
    }
    setSelectGood(newData.filter(selectItem => selectItem.num > 0));
  };
  useEffect(() => {
    console.log(selectGood, "选择的商品");
    const newTotal = calculateTatal(selectGood);
    setTotal(newTotal);
  }, [selectGood]);
  useEffect(() => {
    console.log(total);
    setExpand(total !== 0);
  }, [total]);
  return (
    <PageView tabBarPlaceholder loading={false}>
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
    </PageView>
  );
};

export default Index;
