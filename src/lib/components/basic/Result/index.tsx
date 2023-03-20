import { View, Image, ViewProps } from "@tarojs/components";
import React from "react";
import { Text } from "@src/lib/components/basic/Text";
import { Icon } from "@nutui/nutui-react-taro";

import noFound from "./noFound.svg";
import noSubscribe from "./noSubscribe.svg";
import styles from "./index.module.scss";
import { Flex } from "../Flex";

/** 状态码，根据 http code 语义定义
 * 参考：https://www.runoob.com/http/http-status-codes.html
 */
export type StatusCode = 500 | 404 | 403 | 412;
export type StatusKey = "success" | "error" | "info" | "warning";

export const IconMap: { [key in StatusKey]: React.ReactNode } = {
  /** 成功 */
  success: <Icon value="check-circle" size={60} color="#00a56d" />,
  /** 错误 */
  error: <Icon value="close-circle" size={60} color="#e63c2d" />,
  /** 信息 */
  info: <Icon value="subtract-circle" size={60} color="#ff6600" />,
  /** 警告 */
  warning: <Icon value="alert-circle" size={60} color="#ff6600" />,
};

export const ImageMap: { [key in StatusCode]: string } = {
  /** 错误 */
  500: noFound, // 需改图片
  /** 找不到 */
  404: noFound,
  /** 无权限 */
  403: noFound, // 需改图片
  /** 需要开启订阅 */
  412: noSubscribe,
};

export type Status = StatusKey | StatusCode;

export interface ResultProps extends ViewProps {
  status?: Status;
  icon?: React.ReactNode;
  image?: string;
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  extra?: React.ReactNode;
}

const renderIcon = (status?: Status, image?: string, icon?: React.ReactNode) => {
  if (image || (status && ImageMap[status])) {
    return <Image className={styles.iconImage} src={image || ImageMap[status as string]} />;
  }

  return <View className={styles.icon}>{icon || (status && IconMap[status])}</View>;
};

export const Result: React.FC<ResultProps> = React.memo(props => {
  const { status, image, icon, title, subTitle, extra, children } = props;
  return (
    <View className={styles.result}>
      {renderIcon(status, image, icon)}
      <Flex flexDirection="column" gap="16rpx">
        <Text className={styles.title} size="30rpx" bold="bold">
          {title}
        </Text>
        <Text className={styles.subTitle} size="26rpx" color="lightGray#999999">
          {subTitle}
        </Text>
      </Flex>
      {extra ? <View className={styles.extra}>{extra}</View> : null}
      {children}
    </View>
  );
});

Result.defaultProps = {};
