import { InputNumber, Button, Animate, Avatar, ConfigProvider } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";

import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { Text } from "@src/lib/components/basic/Text";

import { usePresenter } from "../../presenter";
import { GoodsItemProps } from "@src/apis/goods/get-goods-list";
import { useDebounce } from "@src/lib/hooks/useDebounce";

export interface GoodsProps {
  onSelect: (type: string) => void;
  data: GoodsItemProps;
}
export const Goods = (props: GoodsProps) => {
  const [expand, setExpand] = useState(false);
  const [action, setAction] = useState("click");

  const { model } = usePresenter();
  const { selectGoods } = model.state;
  const [num, setNum] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const add = useDebounce(() => {
    console.log("add");
    props.onSelect("add");
    setDisabled(false);
  }, 800);
  const reduce = useDebounce(() => {
    console.log("reduce");
    props.onSelect("reduce");
    setDisabled(false);
  }, 800);
  useEffect(() => {
    // console.log(selectGoods, "已选择商品");
    const isSelect = selectGoods.find(item => item.id === props.data.id);
    if (isSelect) {
      setExpand(true);
      setNum(isSelect.num);
    } else {
      setNum(0);
      setExpand(false);
    }
  }, [props.data.id, selectGoods]);
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
              <Animate type="slide-left" action={action}>
                <Button
                  style={{ padding: "0px 16rpx", height: "32rpx" }}
                  shape="square"
                  type="primary"
                  icon="plus"
                  size="normal"
                  color="rgb(249, 220, 74)"
                  onClick={() => {
                    setAction("click");
                    props.onSelect("add");
                    setExpand(true);
                  }}
                ></Button>
              </Animate>
            ) : (
              <Animate type="slide-right" action="initial">
                <ConfigProvider>
                  <InputNumber
                    readonly
                    modelValue={num}
                    onAdd={() => {
                      setDisabled(true);
                      add();
                    }}
                    disabled={disabled}
                    onReduce={() => {
                      setDisabled(true);
                      reduce();
                    }}
                    onChangeFuc={(number: string | number) => {
                      console.log(number, "number");
                    }}
                    // overlimit={() => {
                    //   console
                    //   if (disabled) return false;
                    //   setAction("initial");
                    //   setExpand(false);
                    //   props.onSelect("reduce");
                    // }}
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
