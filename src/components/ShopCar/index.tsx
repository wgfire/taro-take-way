import { Icon, Animate, Button, AnimatingNumbers } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { Text } from "@src/lib/components/basic/Text";
import styles from "./index.module.scss";

import classNames from "classnames";
import { RouteUtil } from "@src/utils/RouteUtil";
import { CarBox } from "./CarBox";
import { useModel } from "./model";

export interface ShopCarProps {
  price: number;
  expand: boolean;
  onClick?: () => void;
  total: number;
}
export const ShopCar = (props: ShopCarProps) => {
  const { expand } = props;
  const model = useModel();
  const indexPage = RouteUtil.getCurrentPagePath() === "/pages/index/index";
  return expand ? (
    <Animate type="slide-bottom" className={classNames(styles.shopCarWarpper, !RouteUtil.isTabRoute() ? styles.tabBarSafe : "")}>
      {indexPage && <CarBox></CarBox>}
      <View
        className={styles.shopCar}
        onTap={() => {
          console.log("s");
          model.setState({ showCar: !model.state.showCar });
        }}
      >
        <View style={{ display: "flex", alignItems: "center" }}>
          <Icon name="cart" size={30}></Icon>
          <Text size="36rpx" style={{ marginLeft: "12rpx" }}>
            ￥
          </Text>
          <AnimatingNumbers.CountUp endNumber={props.price.toFixed(2)} easeSpeed={0.5} maxLen={2} thousands={false} />
          <Text size="24rpx" style={{ marginLeft: "16rpx" }}>
            商品数量 {props.total ?? 0}
          </Text>
        </View>
        <Button
          size="large"
          onClick={e => {
            e.stopPropagation();
            props.onClick?.();
          }}
          shape="square"
          type="primary"
          color="black"
          style={{ height: "100%", width: "160rpx", borderRadius: "10rpx 20rpx 10rpx 20rpx" }}
        >
          <Text color="white">去结算 </Text>
        </Button>
      </View>
    </Animate>
  ) : null;
};
