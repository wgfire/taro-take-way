import React from "react";
import { SafeAreaHeader } from "../SafeAreaHeader";
import type { SafeAreaHeaderProps } from "../SafeAreaHeader";
import { StringUtil } from "../../../utils/StringUtil";
import { useIntersectionObserver } from "../../../hooks/useIntersectionObserver";
import type { Property } from "csstype";

// TODO: 重命名

export interface Header2Props extends Omit2<SafeAreaHeaderProps, "fixed" | "style"> {
  /** 背景色 */
  rgb: `${number},${number},${number}`;
  /** 字体颜色, 数组值分别为透明度为0or1时的字体颜色 */
  fontColor?: [Property.Color, Property.Color];
  /**
   * 开启滚动页面自动透明度变化
   * @description 为 true 将自动沉浸式
   */
  autoTransparent?: boolean;
}

export const Header2: React.FC<Header2Props> = React.memo(props => {
  const { rgb, fontColor, autoTransparent, ...restSafeAreaHeaderProps } = props;

  const [id] = React.useState(() => StringUtil.uniqueId());
  const [alpha, setAlpha] = React.useState(autoTransparent ? 0 : 1);

  useIntersectionObserver({
    targetSelector: `#${id}`,
    thresholds: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    callback: res => {
      if (autoTransparent) {
        setAlpha(Math.ceil((1 - res.intersectionRatio) * 10) / 10);
      }
    },
  });

  const color: Property.Color = fontColor ? (alpha < 0.5 ? fontColor[0] : fontColor[1]) : "inherit";

  return (
    <React.Fragment>
      <SafeAreaHeader.Placeholder id={id} style={{ position: "absolute", top: 0, left: 0, width: 1, height: SafeAreaHeader.height * 2 }} />
      {!autoTransparent && <SafeAreaHeader.Placeholder />}
      <SafeAreaHeader {...restSafeAreaHeaderProps} fixed style={{ backgroundColor: `rgba(${rgb},${alpha})`, color, transition: "all 100ms" }} />
    </React.Fragment>
  );
});
