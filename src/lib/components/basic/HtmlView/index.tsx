import React from "react";
import classnames from "classnames";
import { View, ViewProps } from "@tarojs/components";
import './index.scss';

export interface HtmlProps extends ViewProps {
  value?: string;
}

export const HtmlView: React.FC<HtmlProps> = React.memo(props => {
  const { value, className, ...rest } = props;

  if (!value) {
    return null;
  }

  const html = value
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, "\xa0")

  return <View className={classnames('htmlView', className)} {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
});
