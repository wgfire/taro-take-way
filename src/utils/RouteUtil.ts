import { AppConfig, getApp, getCurrentInstance } from "@tarojs/taro";
import type { RoutePath } from "./Navigation";

export interface EventChannel {
  on(eventName: string, callback: (data: any) => void): void;
  emit(eventName: string, data: any): void;
}

/** 小程序路由工具库 */
export class RouteUtil {
  /** 获取当前页面路由 */
  static getCurrentPagePath() {
    const page = getCurrentInstance();
    return page.router?.path as RoutePath;
  }

  /**
   * 获取页面事件监听函数
   * @description 不要在组件卸载的时候使用，此时页面实例销毁，该事件通道无法使用
   */
  static getOpenerEventChannel(): EventChannel {
    return (getCurrentInstance().page as any).getOpenerEventChannel();
  }

  /**
   * 是否为 tab 页面路径
   * @description 不传入路径将使用当前页面路径
   */
  static isTabRoute(path?: RoutePath) {
    const appConfig = getApp().config as AppConfig;
    const currentPath = path ?? this.getCurrentPagePath();
    return appConfig.tabBar?.list.map(_ => `/${_.pagePath}`).some(_ => currentPath.startsWith(_));
  }
}
