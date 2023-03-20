import React from "react";
import classnames from "classnames";
import { Text as TText, type TextProps as TTextProps } from "@tarojs/components";
import { colorClassNameMap, sizeClassNameMap } from "./classNameMap";
import styles from "./index.module.scss";

export type TextColor = "primary" | "blueGray#8B99B0" | "darkGray#666666" | "lightGray#999999" | "purple" | "orange" | "brown" | "green" | "white" | "red" | "inherit";

export type TextSize = "40rpx" | "38rpx" | "36rpx" | "34rpx" | "32rpx" | "30rpx" | "28rpx" | "26rpx" | "24rpx" | "22rpx" | "inherit";

export interface TextProps extends TTextProps {
  /**
   * 文字颜色
   * @default primary 主题色为蓝色
   * @description
   * - 自定义颜色使用 style
   * - 优先级低于 style 属性
   */
  color?: TextColor;
  /**
   * 透明度
   * @description
   * - 范围 0 - 1
   * - 优先级低于 style 属性
   */
  opacity?: number;
  /**
   * 文字大小
   * @default 28rpx
   * @description
   * - 自定义字体大小用 style 属性
   * - 优先级低于 style 属性
   */
  size?: TextSize;
  /** 加粗 */
  bold?: `${number}` | "bolder" | "lighter" | "bold" | "normal";
  /**
   * 是否溢出隐藏
   */
  ellipsis?: boolean;
  /**
   * 样式
   * @override 缩小类型范围到 React.CSSProperties
   */
  style?: React.CSSProperties;
}

export const Text: React.FC<TextProps> = React.memo(props => {
  const { className, color, size, bold, style, opacity, ellipsis, ...restTextProps } = props;
  return (
    <TText {...restTextProps} className={classnames(colorClassNameMap[color!], sizeClassNameMap[size!], ellipsis && styles.ellipsis, className)} style={{ opacity, fontWeight: bold, ...style }} />
  );
});

Text.defaultProps = {
  color: "inherit",
  size: "28rpx",
};
