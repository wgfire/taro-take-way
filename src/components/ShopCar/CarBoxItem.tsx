import { Avatar, InputNumber } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { GoodsItemProps, SelectGoodsProps } from "@src/pages/index/model";

export interface CarBoxItemProps {
  data: SelectGoodsProps;
  onSelect: (item: GoodsItemProps, type: string) => void;
}
export const CarBoxItem = (props: CarBoxItemProps) => {
  return (
    <Flex style={{ margin: "30rpx", marginRight: "0rpx" }} alignItems="center">
      <Avatar size="normal" style={{ width: "60rpx", height: "60rpx" }} url="https://img.zcool.cn/community/0188ff5cd806eea801214168612aa2.jpg@2o.jpg"></Avatar>
      <Flex flexGrow={1} flexDirection="column" style={{ margin: "0rpx 30rpx", width: 0 }}>
        <Text size="24rpx" ellipsis>
          测试商品描述
        </Text>
        <Text size="22rpx" color="lightGray#999999" ellipsis>
          测试商品描述
        </Text>
      </Flex>
      <Text style={{ marginRight: "30rpx" }}>{props.data.price}￥</Text>
      <InputNumber
        modelValue={props.data.num}
        onAdd={() => {
          props.onSelect(props.data, "add");
        }}
        onReduce={() => {
          props.onSelect(props.data, "reduce");
        }}
        onChangeFuc={(number: string | number) => {
          console.log(number, "number");
        }}
        overlimit={() => {
          props.onSelect(props.data, "reduce");
        }}
      ></InputNumber>
    </Flex>
  );
};
