import { TagSize } from "@src/lib/components/basic/Tag";
import { View } from "@tarojs/components";
import classnames from "classnames";
import React from "react";
import styles from "./index.module.scss";

export interface AnimatedIconProps {
  size?: TagSize;
}

const sizeClassNameMap: Record<TagSize, string> = {
  large: styles.large,
  small: styles.small,
};

export const AnimatedIcon: React.FC<AnimatedIconProps> = React.memo((props) => {
  const { size } = props;

  return (
    <View className={classnames(styles.phone, sizeClassNameMap[size!])}>
      <View className={styles.phoneSound} />
      <View className={styles.phoneSound} />
      <View className={styles.phoneSound} />
    </View>
  );
});

AnimatedIcon.defaultProps = {
  size: "large",
};
