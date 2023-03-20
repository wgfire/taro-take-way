import React from "react";
import classnames from "classnames";
import { Text } from "@src/lib/components/basic/Text";
import { Flex, FlexItemProps } from "@src/lib/components/basic/Flex";
import styles from "./index.module.scss";

// TODO: 重命名

export interface ButtonCheckbox extends FlexItemProps {
  children: string | React.ReactElement;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const ButtonCheckbox: React.FC<ButtonCheckbox> = React.memo(props => {
  const { checked, onChange, children, ...flexItemProps } = props;
  return (
    <Flex justifyContent="center" alignItems="center" {...flexItemProps} className={classnames(styles.button, checked && styles.checked)} onClick={() => onChange?.(!checked)}>
      <Text size="26rpx" color={props.checked ? "primary" : "darkGray#666666"}>
        {children}
      </Text>
    </Flex>
  );
});
