import React from "react";
import { SafeAreaHeader } from "../SafeAreaHeader";
import type { SafeAreaHeaderProps } from "../SafeAreaHeader";
import { View, ViewProps } from "@tarojs/components";
import styles from "./index.module.scss";

// TODO: 删除该组件及样式

export interface HeaderProps extends ViewProps, SafeAreaHeaderProps {
  title?: string;
  /** 覆写类型 */
  style?: React.CSSProperties;
}

export const Header: React.FC<HeaderProps> = React.memo(props => (
  <SafeAreaHeader {...props} flexShrink={0}>
    {/* <View className={styles.headerLeft}>test</View> */}
    {props.title && <View className={styles.headerTitle}>{props.title}</View>}
  </SafeAreaHeader>
));
