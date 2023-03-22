import { Cell } from "@nutui/nutui-react-taro";
import { ShopCar } from "@src/components/ShopCar";
import { Flex } from "@src/lib/components/basic/Flex";
import { PageView } from "@src/lib/components/layout/PageView";
import { eventCenter } from "@tarojs/taro";
import { useState } from "react";

const Order = () => {
  const [address, setAddress] = useState("");
  const [goods, setGoods] = useState([]);
  eventCenter.on("order", data => {
    setGoods(data);
  });
  return (
    <PageView tabBarPlaceholder loading={false}>
      <Cell title={address || "请选择收货地址"} isLink />
      <ShopCar price={50} expand isTabBar={false}></ShopCar>
    </PageView>
  );
};

export default Order;
