import { Cell, Divider, TextArea } from "@nutui/nutui-react-taro";
import { ShopCar } from "@src/components/ShopCar";
import { Flex } from "@src/lib/components/basic/Flex";

import { PageView } from "@src/lib/components/layout/PageView";
import { useDidMount } from "@src/lib/hooks/lifecycle";
import { Navigation } from "@src/utils/Navigation";

import Taro, { eventCenter, useDidShow } from "@tarojs/taro";

import { usePresenter as useIndexPresenter } from "../index/presenter";
import { usePresenter as useAddressPresenter } from "../address/presenter";
import { calculateTotal } from "../index/utils";
import { GoodsItem } from "./goodsItem";
import { usePresenter } from "./presenter";
import { submitOrder } from "@src/apis/order/submit-order";

import { useState } from "react";

const Order = () => {
  const { model: indexModel, selectGoodsTotal } = useIndexPresenter();
  const { model } = usePresenter();
  const { getAddressListData, model: adModel } = useAddressPresenter();
  const { selectGoods } = indexModel.state;
  const [remark, setRemark] = useState("");

  useDidShow(async () => {
    await getAddressListData();
    setTimeout(() => {
      if (adModel.state.address.length > 0) {
        const isdefaul = adModel.state.address.filter(el => `${el.contacts}--${el.address}` === model.state.address);
        if (isdefaul.length <= 0) {
          model.setState({
            address: "",
            id: 0,
          });
        }
      } else {
        model.setState({
          address: "",
          id: 0,
        });
      }
    }, 0);
  });

  useDidMount(async () => {
    console.log(indexModel.state.selectGoods, "选择的商品");
    await getAddressListData();
    eventCenter.on("selectAddress", (data, id) => {
      model.setState({
        address: data,
        id,
      });
    });
    setTimeout(() => {
      if (adModel.state.address.length > 0) {
        const isdefaul = adModel.state.address.filter(el => el.isDefault);
        const defaul = isdefaul.length > 0 ? isdefaul[0] : adModel.state.address[0];
        model.setState({
          address: defaul.contacts + defaul.address,
          id: defaul.id as number,
        });
      }
    }, 0);
  });
  const pay = async () => {
    if (!model.state.address) {
      Taro.showModal({
        title: "提示",
        content: "请选择收货地址",
      });
    } else {
      const result = await submitOrder({ addressId: model.state.id, totalPrice: indexModel.state.total, remarks: remark, orderGoodsIds: selectGoods.map(el => el.id) });

      result.code === 1000 &&
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
        <Cell title={model.state.address || "请选择收货地址"} isLink to="/pages/address/index?link=order" style={{ height: "100rpx", display: "flex", alignItems: "center" }} />
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
        <TextArea
          defaultValue={remark}
          placeholder="请输入备注内容"
          onChange={value => {
            console.log(value);
            setRemark(value);
          }}
          limitshow
          maxlength="500"
        />
      </PageView.Content>
      <ShopCar total={selectGoodsTotal()} price={calculateTotal(selectGoods)} expand onClick={() => pay()}></ShopCar>
    </PageView>
  );
};

export default Order;
