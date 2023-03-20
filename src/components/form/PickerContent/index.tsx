import { Flex } from "@src/lib/components/basic/Flex";
import { Icon } from "@src/lib/components/basic/Icon";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import styles from "./index.module.scss";

export interface PickerContentProps {
  text: string;
}

export const PickerContent: React.FC<PickerContentProps> = React.memo(props => {
  return (
    <Flex alignItems="center" gap="10rpx">
      <Text className={styles.text} ellipsis>
        {props.text}
      </Text>
      <Icon type="right" color="lightGray#999999" />
    </Flex>
  );
});
