import { Animate } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { usePresenter } from "@src/pages/index/presenter";
import { CarBoxItem } from "./CarBoxItem";

import styles from "./index.module.scss";

export const CarBox = () => {
  const { model: IndexModel, selectGoodsHandel } = usePresenter();
  return (
    <Animate type="slide-bottom" className={styles.carboxWapper} action="initial">
      <Flex className={styles.carboxContent} flexDirection="column">
        <Flex justifyContent="space-between" style={{ width: "100%", padding: "10rpx 0rpx 20rpx 0rpx" }}>
          <Text size="26rpx">商品列表</Text>
          <Text
            size="26rpx"
            color="darkGray#666666"
            onClick={() => {
              IndexModel.resetState();
            }}
          >
            清空购物车
          </Text>
        </Flex>
        <Flex flexDirection="column" style={{ maxHeight: "30vh", overflow: "auto" }}>
          {IndexModel.state.selectGoods.map(goods => {
            return <CarBoxItem key={goods.menuId} data={goods} onSelect={(item, type) => selectGoodsHandel(item, type)}></CarBoxItem>;
          })}
        </Flex>
      </Flex>
    </Animate>
  );
};
