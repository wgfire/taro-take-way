import { Avatar } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";

import { Text } from "@src/lib/components/basic/Text";
import { SelectGoodsProps } from "../index/model";

export interface GoodsItemProps {
  data: SelectGoodsProps;
}
export const GoodsItem = (props: GoodsItemProps) => {
  const { data } = props;
  return (
    <Flex style={{ margin: "10rpx 0px", padding: "20rpx", background: "white" }} alignItems="center">
      <Avatar url="https://img.zcool.cn/community/0188ff5cd806eea801214168612aa2.jpg@2o.jpg" size="normal"></Avatar>
      <Flex flexGrow={1} flexDirection="column" style={{ marginLeft: "50rpx", marginRight: "18rpx", width: 0 }}>
        <Text size="28rpx" ellipsis>
          这是一个橙子
        </Text>
        <Text size="24rpx" ellipsis color="lightGray#999999">
          这是一个橙子
        </Text>
      </Flex>
      <Text style={{ width: "100rpx" }}>x{data.num}</Text>
      <Text style={{ flexBasis: "150rpx", textAlign: "right" }}>{(data.num * data.price).toFixed(2)}</Text>
      <Text style={{ width: "20rpx" }}>￥</Text>
    </Flex>
  );
};
