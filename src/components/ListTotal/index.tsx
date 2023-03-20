import { View } from "@tarojs/components";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import styles from "./index.module.scss";

export interface ListTotalProps {
  total?: number | string | null;
}

export const ListTotal: React.FC<ListTotalProps> = React.memo(props => {
  return (
    <View className={styles.total}>
      <Text color="darkGray#666666" size="26rpx">
        搜索到 <Text color="red">{props.total}</Text> 个结果
      </Text>
    </View>
  );
});
