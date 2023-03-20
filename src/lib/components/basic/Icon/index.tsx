import React from "react";
import classnames from "classnames";
import { Text, type TextProps } from "@src/lib/components/basic/Text";

// NOTE: 该文件由脚本生成，请勿修改

export type IconType =
  | "address"
  | "agreement"
  | "back"
  | "card"
  | "check-circle-fill"
  | "check-fill"
  | "checked"
  | "circle"
  | "clock"
  | "close"
  | "down-fill"
  | "down-stroke"
  | "edit"
  | "email"
  | "flag"
  | "home"
  | "money"
  | "nut"
  | "plus"
  | "record-strong"
  | "resource"
  | "right"
  | "search"
  | "telephone-fill"
  | "telephone-stroke-calling"
  | "telephone-stroke"
  | "trash"
  | "type"
  | "up-fill"
  | "write"
  | "caigouxuqiu"
  | "duiwaitouzi"
  | "falvsusong"
  | "gongshangxinxi"
  | "lianxinxi"
  | "qiyezizhi"
  | "record-stroke"
  | "shixinbeizhixing"
  | "shuishouweifa"
  | "xiangmuhezuo"
  | "xiangmukaigong"
  | "xiangmukaipan"
  | "xiansuo"
  | "zhaogongyingshang"
  | "login-phone"
  | "login-wechat";

export interface IconProps extends TextProps {
  type: IconType;
}

export const Icon: React.FC<IconProps> = React.memo(props => <Text {...props} className={classnames(`ai-icon-${props.type}`, props.className)} />);
