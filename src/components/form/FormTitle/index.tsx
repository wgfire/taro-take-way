import { View } from "@tarojs/components";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import styles from "./index.module.scss";

export interface FormTitleProps {
  children?: string;
}

export const FormTitle: React.FC<FormTitleProps> = React.memo(props => {
  return (
    <View className={styles.title}>
      <Text size="30rpx" color="darkGray#666666">
        {props.children}
      </Text>
    </View>
  );
});
