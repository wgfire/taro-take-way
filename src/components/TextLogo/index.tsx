import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

export interface TextLogoProps {
  text?: string;
  /**
   * 宽高
   * @default 70rpx
   * @description 样式优先级最该
   * @example 70rpx
   */
  size?: string;
  /** 样式类 */
  className?: string;
  /** 样式 */
  style?: React.CSSProperties;
}

const colorList = ["#E9A67B", "#E59E88", "#BC9EDD", "#97A2E2", "#69A5E6", "#62B4CC"];

/**
 * 文字图标
 * @description 文字颜色默认为白色，背景随机，自定义字体和背景可使用style或者className
 */
export const TextLogo: React.FC<TextLogoProps> = React.memo(props => {
  const [bgColor] = React.useState(() => colorList[Math.floor(Math.random() * colorList.length)]);

  const data = props.text
    ?.slice(0, 4)
    .split("")
    .map((item, i) => (
      <Text className={styles.text} color="inherit" key={i}>
        {item}
      </Text>
    ));

  return (
    <Flex
      style={{ backgroundColor: bgColor, ...props.style, width: props.size, height: props.size, fontSize: props.size }}
      display="inline-flex"
      className={classnames(styles.textLogo, props.className)}
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      alignContent="center"
    >
      {data}
    </Flex>
  );
});

TextLogo.defaultProps = {
  size: "70rpx",
};
