import { Cell } from "@nutui/nutui-react-taro";
import { ShopCar } from "@src/components/ShopCar";

import { PageView } from "@src/lib/components/layout/PageView";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { useRouter } from "@tarojs/taro";
import { useState } from "react";
import { calculateTatal } from "../index/utils";

const Order = () => {
  const { params } = useRouter();
  const [address, setAddress] = useState("");
  const [goods, setGoods] = useState([]);

  useDidMount(() => {
    console.log(params, "路由参数");
  });
  return (
    <PageView tabBarPlaceholder loading={false}>
      <Cell title={address || "请选择收货地址"} isLink />
      <ShopCar price={calculateTatal(goods)} expand></ShopCar>
    </PageView>
  );
};

export default Order;
