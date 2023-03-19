import { Icon, Animate, Button, Row, Toast } from "@nutui/nutui-react-taro";
import { Text, View } from "@tarojs/components";
import { useState } from "react";

import styles from "./index.module.scss";

export interface ShopCarProps {
  price: number;
  expand: boolean;
}
export const ShopCar = (props: ShopCarProps) => {
  const [state, SetState] = useState({
    msg: "toast",
    type: "text",
    cover: false,
    duration: 2,
    closeOnClickOverlay: false,
    icon: "",
    center: true,
  });
  const [showToast, SetShowToast] = useState(false);
  const openToast = (
    type: string,
    msg: string,
    duration?: number,
    icon?: string
  ) => {
    const changeState = Object.assign(state, {
      msg,
      type,
      duration,
      icon,
    });
    SetState(changeState);
  };
  return (
    <>
      <Toast
        msg={state.msg}
        visible={showToast}
        type={state.type}
        onClose={() => {
          SetShowToast(false);
        }}
        cover={state.cover}
      />
      {props.expand && (
        <Animate type="slide-bottom" className={styles.shopCarWarpper}>
          <View className={styles.shopCar}>
            <View style={{ display: "flex", alignItems: "center" }}>
              <Icon name="cart" size={30}></Icon>
              <Text style={{ marginLeft: "12rpx" }}>￥{props.price}</Text>
            </View>
            <Button
              size="large"
              onClick={() => {
                openToast("success", "提交成功");
                SetShowToast(true);
              }}
              shape="square"
              type="primary"
              color="black"
              style={{ height: "100%", width: "200rpx" }}
            >
              去结算
            </Button>
          </View>
        </Animate>
      )}
    </>
  );
};
