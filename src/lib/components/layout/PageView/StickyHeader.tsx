import React, { useEffect, useState } from "react";
import { safeAreaFullHeight, SafeAreaHeader } from "../SafeAreaHeader";
import type { SafeAreaHeaderProps } from "../SafeAreaHeader";
import styles from "./index.module.scss";
import { Header } from "./Header";
import { Flex } from "../../basic/Flex";
import Taro, { PageInstance } from "@tarojs/taro";
import classnames from "classnames";

// TODO:  删除该组件

export interface StickyHeaderProps extends SafeAreaHeaderProps {
  title?: string;
  showTitle?: boolean;
}

export const StickyHeader: React.FC<StickyHeaderProps> = React.memo(props => {
  const { className, children, showTitle, ...rest } = props;
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const observer = Taro.createIntersectionObserver(Taro.getCurrentInstance().page as PageInstance, {
      initialRatio: 0,
      thresholds: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    });

    observer.relativeToViewport().observe(".stickyHeader", res => {
      // 偏移高度，从header底部先算起
      const height = res.boundingClientRect.height - safeAreaFullHeight;

      // 偏移后的 目标元素与视口（或根元素）的相交比例
      const ratio = (height + res.boundingClientRect.top) / height;

      // 透明度
      const o = Math.min(Math.max(1 - ratio, 0), 1);
      setOpacity(o);
    });
  }, []);

  const headerStyle = showTitle ? { backgroundColor: `rgba(255,255,255,${opacity})`, color: opacity ? '#222' : undefined } : { opacity, background: '#fff', color: opacity ? '#222' : undefined };

  return (
    <Flex flexDirection="column" className={classnames("stickyHeader", className)}>
      <SafeAreaHeader.Placeholder />
      <Header style={headerStyle} className={styles.stickyHeaderTitle} {...rest} fixed />
      {children}
    </Flex>
  );
});

StickyHeader.defaultProps = {
  showTitle: false,
};
