import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import styles from "./index.module.scss";

export interface FormLabelProps {
  label: string;
  required?: boolean;
  children?: React.ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = React.memo(props => {
  return (
    <Flex className={styles.label} gap="20rpx" alignItems="center">
      <Flex flexShrink={0}>
        <Text>{props.label}</Text>
        {props.required && <Text color="red">*</Text>}
      </Flex>
      <Flex flexGrow={1} flexDirection="column">
        {props.children}
      </Flex>
    </Flex>
  );
});
