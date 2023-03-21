import { Icon, Animate, Button, AnimatingNumbers } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { Text } from "@src/lib/components/basic/Text";
import styles from "./index.module.scss";

export interface ShopCarProps {
  price: number;
  expand: boolean;
}
export const ShopCar = (props: ShopCarProps) => {
  const { expand } = props;

  console.log(props.price, "current");
  return expand ? (
    <Animate type="slide-bottom" className={styles.shopCarWarpper}>
      <View className={styles.shopCar}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Icon name="cart" size={30}></Icon>
          <Text size="36rpx" style={{ marginLeft: "12rpx" }}>
            ￥
          </Text>
          <AnimatingNumbers.CountUp endNumber={props.price.toFixed(2)} easeSpeed={0.5} maxLen={2} thousands={false} />
        </View>
        <Button size="large" onClick={() => {}} shape="square" type="primary" color="black" style={{ height: "100%", width: "160rpx", borderRadius: "10rpx 20rpx 10rpx 20rpx" }}>
          <Text color="white">去结算</Text>
        </Button>
      </View>
    </Animate>
  ) : null;
};
