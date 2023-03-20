import { InputNumber, Button, Animate, Avatar, ConfigProvider } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";

import { View } from "@tarojs/components";
import { useState } from "react";
import styles from "./index.module.scss";
import { Text } from "@src/lib/components/basic/Text";

export interface GoodsProps {
  onSelect: (price: number) => void;
  imgUrl?: string;
}
export const Goods = (props: GoodsProps) => {
  const [expand, setExpand] = useState(false);
  const [action, setAction] = useState("click");

  return (
    <Flex style={{ height: "220rpx", overflow: "hidden" }} alignItems="center">
      <Avatar style={{ width: "135rpx", height: "135rpx" }} size="large" icon={props.imgUrl || "https://img.zcool.cn/community/0188ff5cd806eea801214168612aa2.jpg@2o.jpg"} />

      <Flex flexDirection="column" style={{ marginLeft: "20rpx", width: 0 }} flexGrow={1}>
        <Text size="26rpx" style={{ marginBottom: "13rpx" }} ellipsis>
          这是一个橙汁这是一个橙汁这是一个橙汁这是一个橙汁
        </Text>

        <Text className={styles.ellipse} color="lightGray#999999" size="24rpx">
          这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子
        </Text>

        <Flex justifyContent="space-between" alignItems="center" style={{ height: "52rpx" }}>
          <Text>$6.6</Text>

          <View>
            {!expand ? (
              <Animate type="slide-left" action={action}>
                <Button
                  style={{ padding: "0px 12rpx", height: "32rpx" }}
                  shape="square"
                  type="primary"
                  icon="plus"
                  size="small"
                  color="rgb(249, 220, 74)"
                  onClick={() => {
                    setAction("click");
                    props.onSelect(6.6);
                    setExpand(true);
                  }}
                ></Button>
              </Animate>
            ) : (
              <Animate type="slide-right" action="initial">
                <ConfigProvider>
                  <InputNumber
                    readonly
                    modelValue={1}
                    onAdd={() => {
                      props.onSelect(6.6);
                    }}
                    onReduce={() => {
                      props.onSelect(-6.6);
                    }}
                    onChangeFuc={(number: string | number) => {
                      console.log(number, "number");
                      // props.onSelect(6.6);
                    }}
                    overlimit={() => {
                      setAction("initial");
                      setExpand(false);
                      props.onSelect(-6.6);
                    }}
                  />
                </ConfigProvider>
              </Animate>
            )}
          </View>
        </Flex>
      </Flex>
    </Flex>
  );
};