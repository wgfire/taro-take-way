import React from "react";
import Taro from "@tarojs/taro";
import classnames from "classnames";
import { Flex, type FlexProps } from "../../basic/Flex";
import type { FlexContainerProps, FlexItemProps } from "../../basic/Flex";
import styles from "./index.module.scss";
import { ViewProps } from "@tarojs/components";

export const systemInfo = Taro.getSystemInfoSync();

export const menuButtonInfo = Taro.getMenuButtonBoundingClientRect();

/** 顶部安全高度，单位 px */
const topSafeHeight = systemInfo.safeArea!.top; // TODO: 确定其是否可能为空

/** 导航栏高度，单位 px */
const safeAreaContentHeight = menuButtonInfo.height + (menuButtonInfo.top - topSafeHeight) * 2;

/** 导航栏全部高度，包含顶部的安全高度 */
export const safeAreaFullHeight = topSafeHeight + safeAreaContentHeight;

export interface SafeAreaHeaderProps extends FlexContainerProps, FlexItemProps, ViewProps {
  /**
   * 是否固定在顶部，脱离文档流
   * @description 脱离文档流后，可以使用 SafeAreaHeader.Placeholder 放置在文档顶部，起到占位作用
   */
  fixed?: boolean;
  /**
   * 样式
   * @override 覆写类型，缩小类型范围
   */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const Placeholder: React.FC<FlexProps> = React.memo(props => (
  <Flex {...props} className={classnames(styles.placeholder, props.className)} flexShrink={0} flexGrow={0} flexBasis={safeAreaFullHeight} />
));

export class SafeAreaHeader extends React.PureComponent<SafeAreaHeaderProps> {
  static readonly defaultProps: PickOptional<SafeAreaHeaderProps> = {
    alignItems: "center",
    flexWrap: "nowrap",
    flexShrink: 0,
  };

  /** SafeAreaHeader 高度，单位 px */
  static height = safeAreaFullHeight;

  /** 与 SafeAreaHeader 同等高度的占位元素，在 SafeAreaHeader fixed 时可用 */
  static Placeholder = Placeholder;

  override render() {
    const { fixed, style, className, ...restProps } = this.props;
    return <Flex {...restProps} style={{ height: safeAreaContentHeight, paddingTop: topSafeHeight, ...style }} className={classnames(fixed && styles.fixed, className)} />;
  }
}
