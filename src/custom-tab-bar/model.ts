import { createModel } from "@src/utils/mvp";

export interface TabbarItem {
  text: string;
  pagePath: string;
  iconPath: string;
  selectedIconPath: string;
}

interface State {
  /** 是否显示tabbar */
  visible: boolean;
  /** tabbar列表 */
  list: TabbarItem[];
  /** 选中的tabbar */
  selected: string;
  /** 文案颜色 */
  color: string;
  /** 选中文案颜色 */
  selectedColor: string;
}

const tabbarList: TabbarItem[] = [
  {
    pagePath: "/pages/index/index",
    text: "首页",
    iconPath: require("../assets/images/tabbar/home.svg"),
    selectedIconPath: require("../assets/images/tabbar/home-fill.svg"),
  },
  {
    pagePath: "/pages/my/index",
    text: "我的",
    iconPath: require("../assets/images/tabbar/my.svg"),
    selectedIconPath: require("../assets/images/tabbar/my-fill.svg"),
  },
];

const defaultState = {
  visible: true,
  list: tabbarList.concat(),
  selected: tabbarList[0].pagePath,
  color: "#666666",
  selectedColor: "#266EFF",
};

const { useModel, useHydrateState, atom } = createModel<State>(defaultState);

export { useModel, useHydrateState, atom };
