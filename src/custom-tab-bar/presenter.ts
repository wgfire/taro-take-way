import { Navigation, RoutePath } from "@src/utils/Navigation";
import { TabbarItem, useModel } from "./model";

export const usePresenter = () => {
  const model = useModel();

  return {
    model,
    /**
     * 设置选中
     * @param pagePath 页面路径
     */
    setSelected(pagePath: RoutePath) {
      model.setState({
        selected: pagePath,
      });
    },
    /**
     * 点击跳转
     * @param item tabbar item
     */
    async switchTab(item: TabbarItem) {
      model.setState({
        selected: item.pagePath,
      });

      const pagePath = item.pagePath;

      Navigation.navigateTo(pagePath as RoutePath);
    },
  };
};
