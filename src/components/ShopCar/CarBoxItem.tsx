import { Avatar, InputNumber } from "@nutui/nutui-react-taro";
import { GoodsItemProps } from "@src/apis/goods/get-goods-list";
import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { SelectGoodsProps } from "@src/pages/index/model";

export interface CarBoxItemProps {
  data: SelectGoodsProps;
  onSelect: (item: GoodsItemProps, type: string) => void;
}
export const CarBoxItem = (props: CarBoxItemProps) => {
  return (
    <Flex style={{ margin: "30rpx", marginRight: "0rpx" }} alignItems="center">
      <Avatar size="normal" style={{ width: "80rpx", height: "80rpx" }} url={props.data.image || "https://img.zcool.cn/community/0188ff5cd806eea801214168612aa2.jpg@2o.jpg"}></Avatar>
      <Flex flexGrow={1} flexDirection="column" style={{ margin: "0rpx 30rpx", width: 0 }}>
        <Text size="30rpx" ellipsis bold="bold">
          {props.data.name}
        </Text>
        <Text size="28rpx" bold="bold" ellipsis>
          {props.data.price}￥
        </Text>
      </Flex>

      <InputNumber
        readonly
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
