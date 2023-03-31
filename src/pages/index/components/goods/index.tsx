import { InputNumber, Button, Animate, Avatar, ConfigProvider } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";

import { View } from "@tarojs/components";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Text } from "@src/lib/components/basic/Text";

import { usePresenter } from "../../presenter";
import { GoodsItemProps } from "@src/apis/goods/get-goods-list";

export interface GoodsProps {
  onSelect: (type: string) => void;
  data: GoodsItemProps;
}
export const Goods = React.memo((props: GoodsProps) => {
  const [expand, setExpand] = useState(false);
  const [action, setAction] = useState("click");
  const { model } = usePresenter();
  const { selectGoods } = model.state;
  const isSelect = selectGoods.find(item => item.id === props.data.id);
  const [num, setNum] = useState(isSelect?.num);
  // useEffect(() => {
  //   const isSelect = selectGoods.find(item => item.id === props.data.id);
  //   if (isSelect) {
  //     setExpand(true);
  //     setNum(isSelect.num);
  //   } else {
  //     setNum(0);
  //     setExpand(false);
  //   }
  // }, [props.data.id, selectGoods]);
  useEffect(() => {
    console.log("展开", expand);
  }, [expand]);
  return (
    <Flex style={{ height: "240rpx", overflow: "hidden", padding: "0rpx 12rpx", boxSizing: "border-box" }} alignItems="center">
      <Avatar style={{ width: "120rpx", height: "120rpx" }} size="large" icon={props.data.image || "https://img.zcool.cn/community/0188ff5cd806eea801214168612aa2.jpg@2o.jpg"} />

      <Flex flexDirection="column" style={{ marginLeft: "26rpx", width: 0 }} flexGrow={1}>
        <Text size="26rpx" style={{ marginBottom: "18rpx" }} ellipsis>
          {props.data.name}
        </Text>

        <Text className={styles.ellipse} color="lightGray#999999" size="24rpx">
          {props.data.name}
        </Text>

        <Flex justifyContent="space-between" alignItems="center" style={{ height: "60rpx" }}>
          <Text size="30rpx">{props.data.price}</Text>

          <View>
            {!expand ? (
              <Animate type="slide-left" action={action} key="1">
                <Button
                  style={{ padding: "0px 16rpx", height: "32rpx" }}
                  shape="square"
                  type="primary"
                  icon="plus"
                  size="normal"
                  color="rgb(249, 220, 74)"
                  onClick={e => {
                    e.stopPropagation();
                    setExpand(true);
                    setAction("click");
                    props.onSelect("add");
                  }}
                ></Button>
              </Animate>
            ) : (
              <Animate type="slide-right" action="initial" key="2">
                <ConfigProvider>
                  <InputNumber
                    readonly
                    modelValue={num}
                    onAdd={() => {
                      props.onSelect("add");
                    }}
                    onReduce={() => {
                      props.onSelect("reduce");
                    }}
                    onChangeFuc={(number: string | number) => {
                      console.log(number, "number");
                    }}
                    overlimit={e => {
                      e.stopPropagation();
                      setExpand(false);
                      setAction("initial");
                      props.onSelect("reduce");
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
});
