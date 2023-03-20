import React from "react";
import classnames from "classnames";
import { Flex } from "../../basic/Flex";
import { Content } from "./Content";
import { ScrollContent } from "./ScrollContent";
import { Header } from "./Header";
import { StickyHeader } from "./StickyHeader";
import { Footer } from "./Footer";
// import { OverlayManager } from "../../basic/overlay";
import styles from "./index.module.scss";
import { View, ViewProps } from "@tarojs/components";
import { NutToast } from "../../basic/Toast";

export type PageContentBackgroundColor = "white" | "lightGray";

export interface PageViewProps extends ViewProps {
  // 页面loading
  loading?: boolean;
  /**
   * 该页面是否存在 tabBar，如果存在，则会在底部裁剪出一个 tabBar 的空间
   * @description
   * - true
   *      内部自动生成一个大小和 tabbar 高度一致的元素
   * - react 元素
   *      那么 tabBarPlaceholder 将被一个大小和 tabbar 高度一致的元素包裹
   */
  tabBarPlaceholder?: React.ReactNode;
  /**
   * 背景色
   * @default white
   */
  backgroundColor?: PageContentBackgroundColor;
  children?: React.ReactNode;
}

export class PageView extends React.PureComponent<PageViewProps> {
  static defaultProps: PickOptional<PageViewProps> = {
    loading: false,
    backgroundColor: "white",
  };

  static Header = Header;

  static StickyHeader = StickyHeader;

  static Footer = Footer;

  static Content = Content;

  static ScrollContent = ScrollContent;

  private readonly classMap: Record<PageContentBackgroundColor, string> = {
    white: styles.white,
    lightGray: styles.lightGray,
  };

  override render() {
    const { loading, tabBarPlaceholder, backgroundColor, className, children } = this.props;
    return (
      <React.Fragment>
        <Flex flexDirection="column" flexGrow={1} className={classnames(styles.pageView, this.classMap[backgroundColor!], className)}>
          {children}
          {tabBarPlaceholder && (
            <Flex flexShrink={0} className={styles.tabBarPlaceholder}>
              {tabBarPlaceholder}
            </Flex>
          )}

          <View className={classnames(styles.loading, loading && styles.show)}>
            <NutToast state={{ type: "loading", visible: loading, msg: "加载中..." }}></NutToast>
          </View>
        </Flex>
        {/* <OverlayManager /> */}
      </React.Fragment>
    );
  }
}
