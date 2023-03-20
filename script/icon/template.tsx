import React from "react";
import classnames from "classnames";
import { Text, type TextProps } from "@src/lib/components/basic/Text";

// NOTE: 该文件由脚本生成，请勿修改

export type IconType = "icon-name";

export interface IconProps extends TextProps {
  type: IconType;
}

export const Icon: React.FC<IconProps> = React.memo(props => <Text {...props} className={classnames(`ai-icon-${props.type}`, props.className)} />);
