import React from "react";
import classnames from "classnames";
import { View } from "@tarojs/components";
import type { ViewProps } from "@tarojs/components/types/View";
import { Property, Globals } from "csstype";
import { flexDirectionClassNameMap, justifyContentClassNameMap, alignContentClassNameMap, alignSelfClassNameMap, alignItemsClassNameMap, flexWrapClassNameMap } from "./classNameMap";
import styles from "./index.module.scss";

type ExcludeString<T> = T extends unknown ? (string & {} extends T ? never : T) : never;

type ExcludeExtra<T, K = ""> = Exclude<ExcludeString<T>, Globals | K>;

export type FlexDirection = ExcludeExtra<Property.FlexDirection>;

export type JustifyContent = ExcludeExtra<Property.JustifyContent>;

export type AlignItems = ExcludeExtra<Property.AlignItems>;

export type AlignContent = ExcludeExtra<Property.AlignContent>;

export type FlexWrap = ExcludeExtra<Property.FlexWrap>;

export type AlignSelf = ExcludeExtra<Property.AlignSelf>;

export type Overflow = ExcludeExtra<Property.Overflow>;

export interface FlexContainerProps {
  /**
   * 启用弹性盒模型的方式，false 为禁用 flexBox
   * @default true
   */
  display?: "inline-flex" | "flex" | false;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  flexWrap?: FlexWrap;
  /**
   * 间距
   * @description 单位：css 长度单位与 %，比如：px em rpx %...
   * @example
   * - 行列间距：gap="20rpx"
   * - 行间距：gap="20rpx 0rpx"
   * - 列间距：gap="0rpx 20rpx"
   * @see https://developer.mozilla.org/zh-CN/docs/Web/CSS/gap
   */
  gap?: string;
}

export interface FlexItemProps {
  alignSelf?: AlignSelf;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: `${number}${"rpx" | "px" | "PX" | "%"}` | number;
  order?: number;
}

/** 设置 bfc 效果 */
export interface OverflowProps {
  overflow?: Overflow;
}

export interface FlexProps extends FlexContainerProps, FlexItemProps, OverflowProps, ViewProps {
  /** 覆写类型 */
  style?: React.CSSProperties;
}

export const Flex: React.FC<FlexProps> = React.memo(props => {
  const { display, flexDirection, justifyContent, alignItems, alignContent, flexWrap, gap, alignSelf, flexGrow, flexShrink, flexBasis, order, overflow, className, style, ...restViewProps } = props;

  // NOTE: 解决当 flexGrow 和 flexShrink 等于 0，编译后不会添加到 style 属性中，这是 Taro 的 bug。flexBasis 没有这个问题
  const finalFlexGrow = (flexGrow === 0 ? "0" : flexGrow) as number;
  const finalFlexShrink = (flexShrink === 0 ? "0" : flexShrink) as number;

  return (
    <View
      {...restViewProps}
      style={{
        flexGrow: finalFlexGrow,
        flexShrink: finalFlexShrink,
        flexBasis,
        order,
        gap,
        overflow,
        ...style,
      }}
      className={classnames(
        display === "flex" && styles.flex,
        display === "inline-flex" && styles.inlineFlex,
        flexDirection && flexDirectionClassNameMap[flexDirection],
        justifyContent && justifyContentClassNameMap[justifyContent],
        alignItems && alignItemsClassNameMap[alignItems],
        alignContent && alignContentClassNameMap[alignContent],
        flexWrap && flexWrapClassNameMap[flexWrap],
        alignSelf && alignSelfClassNameMap[alignSelf],
        alignSelf && alignSelfClassNameMap[alignSelf],
        className
      )}
    />
  );
});

Flex.defaultProps = {
  display: "flex",
};
