import { Icon, type IconType } from "@src/lib/components/basic/Icon";
import { Tag, type TagProps } from "@src/lib/components/basic/Tag";
import { View } from "@tarojs/components";
import React, { CSSProperties } from "react";
import styles from "./index.module.scss";

export interface RoundButtonProps extends Omit2<TagProps, "icon"> {
  icon?: IconType | React.ReactElement;
  style?: CSSProperties;
}

export const RoundButton: React.FC<RoundButtonProps> = React.memo(props => {
  const { icon, size, style, ...tagProps } = props;

  return (
    <Tag {...tagProps} className={styles.roundButton} size={size} style={{ ...style }}>
      <View className={styles.icon}>{icon && (React.isValidElement(icon) ? props.icon : <Icon size={size === "large" ? "32rpx" : "22rpx"} type={icon} />)}</View>
      {props.children}
    </Tag>
  );
});

RoundButton.defaultProps = {
  size: "large",
};
