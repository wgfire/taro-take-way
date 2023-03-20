import type { FlexDirection, JustifyContent, AlignContent, AlignItems, AlignSelf, FlexWrap } from "./index";
import styles from "./index.module.scss";

export const flexDirectionClassNameMap: Record<FlexDirection, string> = {
  column: styles.flexDirectionColumn,
  "column-reverse": styles.flexDirectionColumnReverse,
  row: styles.flexDirectionRow,
  "row-reverse": styles.flexDirectionRowReverse,
};

export const justifyContentClassNameMap: Record<JustifyContent, string> = {
  center: styles.justifyContentCenter,
  end: styles.justifyContentEnd,
  "flex-end": styles.justifyContentFlexEnd,
  "flex-start": styles.justifyContentFlexStart,
  left: styles.justifyContentLeft,
  normal: styles.justifyContentNormal,
  right: styles.justifyContentRight,
  "space-around": styles.justifyContentSpaceAround,
  "space-between": styles.justifyContentSpaceBetween,
  "space-evenly": styles.justifyContentSpaceEvenly,
  start: styles.justifyContentStart,
  stretch: styles.justifyContentStretch,
};

export const alignContentClassNameMap: Record<AlignContent, string> = {
  baseline: styles.alignContentBaseline,
  center: styles.alignContentCenter,
  end: styles.alignContentEnd,
  "flex-end": styles.alignContentFlexEnd,
  "flex-start": styles.alignContentFlexStart,
  normal: styles.alignContentNormal,
  "space-around": styles.alignContentSpaceAround,
  "space-between": styles.alignContentSpaceBetween,
  "space-evenly": styles.alignContentSpaceEvenly,
  start: styles.alignContentStart,
  stretch: styles.alignContentStretch,
};

export const alignItemsClassNameMap: Record<AlignItems, string> = {
  baseline: styles.alignItemsBaseline,
  center: styles.alignItemsCenter,
  end: styles.alignItemsEnd,
  "flex-end": styles.alignItemsFlexEnd,
  "flex-start": styles.alignItemsFlexStart,
  normal: styles.alignItemsNormal,
  start: styles.alignItemsStart,
  stretch: styles.alignItemsStretch,
  "self-end": styles.alignItemsSelfEnd,
  "self-start": styles.alignItemsSelfStart,
};

export const alignSelfClassNameMap: Record<AlignSelf, string> = {
  auto: styles.alignSelfAuto,
  baseline: styles.alignSelfBaseline,
  center: styles.alignSelfCenter,
  end: styles.alignSelfEnd,
  "flex-end": styles.alignSelfFlexEnd,
  "flex-start": styles.alignSelfFlexStart,
  normal: styles.alignSelfNormal,
  start: styles.alignSelfStart,
  stretch: styles.alignSelfStretch,
  "self-end": styles.alignSelfSelfEnd,
  "self-start": styles.alignSelfSelfStart,
};

export const flexWrapClassNameMap: Record<FlexWrap, string> = {
  nowrap: styles.flexWrapNowrap,
  wrap: styles.flexWrapWrap,
  "wrap-reverse": styles.flexWrapWrapReverse,
};
