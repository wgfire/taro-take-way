import type { TextColor, TextSize } from "./index";
import styles from "./index.module.scss";

export const colorClassNameMap: Record<TextColor, string> = {
  primary: styles.primary,
  "blueGray#8B99B0": styles.blueGray,
  "darkGray#666666": styles.darkGray,
  "lightGray#999999": styles.lightGray,
  purple: styles.purple,
  orange: styles.orange,
  brown: styles.brown,
  green: styles.green,
  white: styles.white,
  red: styles.red,
  inherit: styles.colorInherit,
};

export const sizeClassNameMap: Record<TextSize, string> = {
  "40rpx": styles.rpx40,
  "38rpx": styles.rpx38,
  "36rpx": styles.rpx36,
  "34rpx": styles.rpx34,
  "32rpx": styles.rpx32,
  "30rpx": styles.rpx30,
  "28rpx": styles.rpx28,
  "26rpx": styles.rpx26,
  "24rpx": styles.rpx24,
  "22rpx": styles.rpx22,
  inherit: styles.fontSizeInherit,
};
