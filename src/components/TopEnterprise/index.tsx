import { Flex, type FlexItemProps } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import { Image, ITouchEvent } from "@tarojs/components";
import React from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

export interface TopEnterpriseProps extends FlexItemProps {
  children?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: ITouchEvent) => void;
}

export const TopEnterprise: React.FC<TopEnterpriseProps> = React.memo(props => {
  const { children, style, className, onClick, ...flexItemProps } = props;
  return (
    <Flex display="inline-flex" alignItems="center" className={classNames(styles.container, className)} style={style} onClick={props.onClick} {...flexItemProps}>
      <Image mode="widthFix" src={require("./bg.png")} className={styles.img} />
      <Text size="24rpx" color="inherit">
        {children}
      </Text>
    </Flex>
  );
});
