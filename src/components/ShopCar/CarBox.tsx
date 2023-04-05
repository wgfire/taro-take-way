import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { usePresenter } from "@src/pages/index/presenter";
import { CarBoxItem } from "./CarBoxItem";

import styles from "./index.module.scss";
import { clearShopCar } from "@src/apis/goods/set-goods";
import { View } from "@tarojs/components";
import { useModel } from "./model";
import classNames from "classnames";

export const CarBox = () => {
  const { model: IndexModel, selectGoodsHandel } = usePresenter();
  const model = useModel();
  return (
    <View className={classNames(styles.carboxWapper, model.state.showCar ? styles.showCarWarpper : "")}>
      <Flex className={styles.carboxContent} flexDirection="column">
        <Flex justifyContent="space-between" style={{ width: "100%", padding: "10rpx 0rpx 20rpx 0rpx" }}>
          <Text size="26rpx">商品列表</Text>
          <Text
            size="26rpx"
            color="darkGray#666666"
            onClick={async () => {
              await clearShopCar({ goodsIds: IndexModel.state.selectGoods.map(el => el.id) });
              IndexModel.setState({
                total: 0,
                selectGoods: [],
                expand: false,
              });
              model.resetState();
            }}
          >
            清空购物车
          </Text>
        </Flex>
        <Flex flexDirection="column" style={{ maxHeight: "30vh", overflow: "auto" }}>
          {IndexModel.state.selectGoods.map(goods => {
            return <CarBoxItem key={goods.id} data={goods} onSelect={(item, type) => selectGoodsHandel(item, type)}></CarBoxItem>;
          })}
        </Flex>
      </Flex>
    </View>
  );
};
