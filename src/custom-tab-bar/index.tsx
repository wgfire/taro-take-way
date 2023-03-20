import { View, Image } from "@tarojs/components";
import classnames from "classnames";

import { usePresenter } from "./presenter";
import styles from "./index.module.scss";
import { useEffect } from "react";
import { eventCenter } from "@tarojs/taro";

const CustomTabBar = () => {
  const { model, setSelected, switchTab } = usePresenter();
  const { state } = model;

  useEffect(() => {
    eventCenter.on("Navigation", params => {
      if (params.isTabRoute) {
        setSelected(params.url);
      }
    });
    return () => {
      eventCenter.off("Navigation");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <View
      className={classnames({
        [styles["tab-bar"]]: true,
        [styles["hide-tab-bar"]]: !state.visible,
      })}
    >
      {state.list.map((item, index) => (
        <View
          key={index}
          className={classnames({
            [styles["tab-bar-item"]]: true,
            [styles.active]: state.selected === item.pagePath,
          })}
          onClick={() => switchTab(item)}
        >
          <Image src={state.selected === item.pagePath ? item.selectedIconPath : item.iconPath} className={styles["cover-image"]} />
          <View
            style={{
              color: state.selected === item.pagePath ? state.selectedColor : state.color,
            }}
            className={classnames(styles["cover-view"])}
          >
            {item.text}
          </View>
        </View>
      ))}
    </View>
  );
};

export default CustomTabBar;
