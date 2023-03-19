import {
  Row,
  Col,
  Ellipsis,
  InputNumber,
  Button,
  Animate,
  Avatar,
  ConfigProvider,
  Cell,
} from "@nutui/nutui-react-taro";

import { View, Text } from "@tarojs/components";
import { useState } from "react";
import styles from "./index.module.scss";

export interface GoodsProps {
  onSelect: (price: number) => void;
}
export const Goods = (props: GoodsProps) => {
  const [expand, setExpand] = useState(false);
  const [action, setAction] = useState("click");
  //   const
  return (
    <Row
      type="flex"
      style={{ height: "200rpx", marginBottom: "24rpx", overflow: "hidden" }}
    >
      <Col span="8" style={{ alignSelf: "center" }}>
        <Avatar
          style={{ width: "145rpx", height: "145rpx" }}
          size="large"
          icon="https://img.zcool.cn/community/0188ff5cd806eea801214168612aa2.jpg@2o.jpg"
        />
      </Col>
      <Col span={16}>
        <View style={{ marginBottom: "13rpx" }}>这是一个橙子这</View>
        <View
          style={{
            marginBottom: "13rpx",
            overflow: "hidden",
            height: "66rpx",
            width: "100%",
          }}
        >
          <Ellipsis
            className={styles.ellips}
            content="这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子这是一个橙子"
            direction="end"
            rows="2"
          />
        </View>

        <Row
          type="flex"
          style={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Col style={{ width: "max-content" }}>
            <Text>$6.6</Text>
          </Col>
          <Col style={{ width: "max-content" }}>
            {!expand && (
              <Animate type="slide-left" action={action}>
                <Button
                  shape="square"
                  type="primary"
                  icon="plus"
                  onClick={() => {
                    setAction("click");
                    props.onSelect(6.6);
                    setExpand(true);
                  }}
                ></Button>
              </Animate>
            )}

            {expand && (
              <Animate type="slide-right" action="initial">
                <ConfigProvider>
                  <InputNumber
                    modelValue={1}
                    onChangeFuc={(number: number) => {
                      console.log(number, "number");
                      props.onSelect(6.6);
                    }}
                    overlimit={() => {
                      setAction("initial");
                      setExpand(false);
                    }}
                  />
                </ConfigProvider>
              </Animate>
            )}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
