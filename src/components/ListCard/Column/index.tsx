import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import styles from "./index.module.scss";

export interface ColumnProps {
  data: { label: string; value: React.ReactNode }[];
}

export const Column: React.FC<ColumnProps> = React.memo(props => {
  return (
    <Flex className={styles.column}>
      {props.data.map((item, index) => {
        return (
          <Flex flexGrow={1} key={index} flexDirection="column" alignItems="center" className={styles.item}>
            <Text size="22rpx" color="lightGray#999999" className={styles.label}>
              {item.label}
            </Text>
            <Text size="26rpx" color="darkGray#666666">
              {item.value}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
});
