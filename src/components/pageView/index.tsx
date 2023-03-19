import { View } from "@tarojs/components";
import styles from "./index.module.scss";

export const PageView = (props) => {
  return <View className={styles.pageView}>{props.children}</View>;
};
