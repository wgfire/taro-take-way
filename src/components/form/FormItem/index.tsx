import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import type { ITouchEvent } from "@tarojs/components";

export interface FormItemProps {
  label?: React.ReactNode;
  required?: boolean;
  direction?: "column" | "row";
  children?: React.ReactNode;
  onClick?: (event: ITouchEvent) => void;
}

export const FormItem: React.FC<FormItemProps> = React.memo(props => {
  const isColumn = props.direction === "column";

  return (
    <Flex
      flexDirection={props.direction}
      alignItems={isColumn ? "stretch" : "center"}
      justifyContent="space-between"
      className={classnames(styles.formItem, isColumn ? styles.formItemColumn : styles.formItemRow)}
      onClick={props.onClick}
    >
      <Flex flexShrink={0}>
        <Text size="28rpx" bold>
          {props.label}
        </Text>
        {props.required && (
          <Text color="red" size="28rpx">
            *
          </Text>
        )}
      </Flex>
      <Flex flexDirection="column" className={classnames(isColumn && styles.contentColumn)}>
        {props.children}
      </Flex>
    </Flex>
  );
});
