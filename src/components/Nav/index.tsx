import { Header2, Header2Props } from "@src/lib/components/layout/PageView/Header2";
import { Text } from "@src/lib/components/basic/Text";
import { Icon } from "@src/lib/components/basic/Icon";
import { Flex } from "@src/lib/components/basic/Flex";
import React from "react";
import styles from "./index.module.scss";
import Taro from "@tarojs/taro";

export interface NavProps extends Pick<Header2Props, "autoTransparent" | "fontColor"> {
  title: string;
  back?: boolean;
  home?: boolean;
}

export const Nav: React.FC<NavProps> = React.memo(props => {
  return (
    <Header2 rgb="255,255,255" fontColor={props.fontColor} alignItems="center" autoTransparent={props.autoTransparent}>
      <Flex alignSelf="stretch">
        {props.back && (
          <Flex alignItems="center" style={{ padding: "0 20rpx" }} onClick={() => Taro.navigateBack()}>
            <Icon type="back" size="40rpx" />
          </Flex>
        )}
        {props.home && (
          <Flex alignItems="center" style={{ padding: "0 20rpx" }} onClick={() => Taro.navigateBack({ delta: 100 })}>
            <Icon type="home" size="40rpx" />
          </Flex>
        )}
      </Flex>
      <Flex className={styles.title}>
        <Text size="34rpx">{props.title}</Text>
      </Flex>
    </Header2>
  );
});

Nav.defaultProps = {
  fontColor: ["#fff", "inherit"],
};
