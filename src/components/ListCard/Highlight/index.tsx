import React from "react";
import classnames from "classnames";
import { Text, TextProps } from "@src/lib/components/basic/Text";
import styles from "./index.module.scss";

export interface TitleProps extends TextProps {
  /** 高亮文案，为一个浏览器端 html 字符 */
  highlight?: string;
  /** 如果为标题，那么采用标题的样式 */
  type?: "title";
}

export const Highlight: React.FC<TitleProps> = React.memo(props => {
  const { highlight, type, children, ...restTextProps } = props;

  const isTitle = type === "title";

  return (
    <Text
      size={isTitle ? "32rpx" : undefined}
      bold={isTitle ? "500" : undefined}
      className={classnames(isTitle && styles.title)}
      dangerouslySetInnerHTML={highlight ? { __html: highlight } : undefined}
      {...restTextProps}
    >
      {!highlight && children}
    </Text>
  );
});
