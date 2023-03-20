import { View, type ITouchEvent } from "@tarojs/components";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import classnames from "classnames";
import styles from "./index.module.scss";
import { Flex } from "@src/lib/components/basic/Flex";
import { Icon, IconType } from "@src/lib/components/basic/Icon";

export interface ItemProps {
  /** 前置图标 */
  icon?: IconType;
  /** 内容描述 */
  label?: string;
  /** label 是否显示冒号 */
  colon?: boolean;
  /** 超出省略 */
  ellipsis?: boolean;
  /** 是否含有背景色 */
  hasBgColor?: boolean;
  /** 内容 */
  children?: React.ReactNode;
  onClick?: (event: ITouchEvent) => void;
}

export const Item: React.FC<ItemProps> = React.memo(props => (
  <Flex
    className={props.hasBgColor ? styles.bgItem : styles.item}
    onClick={event => {
      event.stopPropagation();
      props.onClick?.(event);
    }}
  >
    {props.icon && (
      <View className={styles.icon}>
        <Icon type={props.icon} size="24rpx"></Icon>
      </View>
    )}
    {props.label && (
      <View className={styles.label}>
        <Text size="24rpx" color="lightGray#999999">
          {props.label}
          {props.colon && ": "}
        </Text>
      </View>
    )}
    <View className={classnames(styles.content, props.ellipsis && styles.ellipsis)}>
      {typeof props.children === "number" || typeof props.children === "string" ? (
        <Text size="24rpx" color="darkGray#666666" className={classnames(styles.content, props.ellipsis && styles.ellipsis)}>
          {props.children}
        </Text>
      ) : (
        props.children
      )}
    </View>
  </Flex>
));
