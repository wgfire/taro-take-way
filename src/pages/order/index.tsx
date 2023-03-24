import { Cell, Divider, TextArea } from "@nutui/nutui-react-taro";
import { ShopCar } from "@src/components/ShopCar";
import { Flex } from "@src/lib/components/basic/Flex";

import { PageView } from "@src/lib/components/layout/PageView";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { Navigation } from "@src/utils/Navigation";
import { View } from "@tarojs/components";
import Taro, { eventCenter } from "@tarojs/taro";

import { usePresenter as useIndexPresenter } from "../index/presenter";
import { calculateTotal } from "../index/utils";
import { GoodsItem } from "./goodsItem";
import { usePresenter } from "./presenter";

const Order = () => {
  const { model: indexModel } = useIndexPresenter();
  const { model } = usePresenter();
  const { selectGoods } = indexModel.state;

  useDidMount(() => {
    console.log(indexModel.state.selectGoods, "选择的商品");
    eventCenter.on("selectAddress", data => {
      model.setState({
        address: data,
      });
    });
  });
  const pay = () => {
    if (!model.state.address) {
      Taro.showModal({
        title: "提示",
        content: "请选择收货地址",
      });
    } else {
      Taro.showToast({
        title: "订单支付成功",
        icon: "success",
        duration: 2000,
      }).then(() => {
        setTimeout(() => {
          indexModel.resetState();
          Navigation.reLaunch({
            url: "/pages/index/index",
          });
        }, 1000);
      });
    }
  };

  return (
    <PageView tabBarPlaceholder loading={false} backgroundColor="lightGray">
      <PageView.Content style={{ marginBottom: "70rpx" }}>
        <Cell title={model.state.address || "请选择收货地址"} isLink to="/pages/address/index" />
        <Divider styles={{ color: "#9E9E9E", borderColor: "#9E9E9E", height: "36rpx", padding: "0px 12rpx", marginBottom: "30rpx" }} direction="vertical">
          商品列表
        </Divider>
        <Flex style={{ background: "white", overflow: "auto" }} flexDirection="column">
          {selectGoods.map(item => {
            return <GoodsItem key={item.id} data={item}></GoodsItem>;
          })}
        </Flex>

        <Divider styles={{ color: "#9E9E9E", borderColor: "#9E9E9E", height: "36rpx", padding: "0px 12rpx", margin: "30rpx 0rpx" }} direction="vertical">
          订单备注
        </Divider>
        <TextArea defaultValue="订单备注" limitshow maxlength="500" />
      </PageView.Content>
      <ShopCar price={calculateTotal(selectGoods)} expand onClick={() => pay()}></ShopCar>
    </PageView>
  );
};

export default Order;
