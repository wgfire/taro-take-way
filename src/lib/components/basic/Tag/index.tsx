import React from "react";
import classnames from "classnames";
import { View, Text, type ITouchEvent } from "@tarojs/components";
import { colorClassNameMap } from "../Text/classNameMap";
import type { TextColor } from "../Text";
import styles from "./index.module.scss";
import { Icon, type IconType } from "../Icon";

export type TagColor = Exclude2<TextColor, "red"> | (string & {});

export type TagSize = "large" | "small";

export interface TagProps {
  /** 可从 TextColor 中取，也支持自定义颜色 */
  color?: TagColor;
  /** 边框颜色，默认为 color */
  borderColor?: string | undefined;
  /**
   * tag 类型
   * - fill 代表填充颜色，浅背景色铺满
   * - stroke 代表含有边框包裹，无背景色
   * - both 背景颜色填充加边框
   * @default fill
   */
  type?: "fill" | "stroke" | "both";
  /**
   * 字体大小
   * @default small
   * @description 自定义大小使用style属性
   * - large 28rpx
   * - small 22rpx
   */
  size?: TagSize;
  /** 左侧图标 */
  icon?: IconType;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
  onClick?: (event: ITouchEvent) => void;
}

const sizeClassNameMap: Record<TagSize, string> = {
  large: styles.large,
  small: styles.small,
};

const tagColorClassNameMap: Record<Exclude2<TextColor, "red"> | "red", string> = {
  ...colorClassNameMap,
  red: styles.red, // 标签的红色自定义，与字体色区分开来
};

export const Tag: React.FC<TagProps> = React.memo(props => {
  const { color, borderColor, type, size, icon, style, className, children, onClick } = props;
  const colorClassName = tagColorClassNameMap[color!] as string | undefined;
  const finalStyle: React.CSSProperties = Object.assign({ borderColor } as React.CSSProperties, style, colorClassName === undefined ? { color } : undefined);
  // NOTE: key 为了外部根据 color 切换颜色能正常显示
  return (
    <View
      key={color}
      className={classnames(styles.tag, colorClassName, sizeClassNameMap[size!], (type === "stroke" || type === "both") && styles.stroke, className)}
      style={finalStyle}
      onClick={onClick}
    >
      {(type === "both" || type === "fill") && <View className={styles.fill} />}
      <View className={styles.content}>
        {icon && <Icon type={icon} size="inherit" className={styles.icon} />}
        {React.isValidElement(children) || Array.isArray(children) ? children : <Text>{children}</Text>}
      </View>
    </View>
  );
});

Tag.defaultProps = {
  size: "small",
  color: "primary",
  type: "fill",
};
