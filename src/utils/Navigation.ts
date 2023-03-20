import { navigateTo, navigateBack, switchTab, reLaunch, eventCenter } from "@tarojs/taro";
import { stringifyQuery } from "./common";
// import type { PagePaths } from "../app.config";
import appConfig from "../app.config";
import { RouteUtil } from "./RouteUtil";

export type PagePaths = (typeof appConfig.pages)[number];

export type Path<T> = T extends string ? `/${T}` : never;

/** 跳转路由类型 */
export type RoutePath = Path<PagePaths>;

/** 页面路径类型 */
// export type { PagePaths };

export interface NavigateOptions {
  query: Record<string, any>;
}

export interface ReLaunchOption extends Omit2<Taro.reLaunch.Option, "url"> {
  url: RoutePath;
}

type NavigateToOption = Parameters<typeof navigateTo>[0];

export class Navigation {
  /** 跳转页面，集成 navigateTo & switchTab，只需要传入路径即可 */
  static navigateTo(url: RoutePath, query: PlainObject = {}, option: Omit2<NavigateToOption, "url"> = {}) {
    const finalUrl = `${url}${stringifyQuery(query)}` as RoutePath;

    if (RouteUtil.isTabRoute(finalUrl)) {
      eventCenter.trigger("Navigation", {
        url: finalUrl,
        isTabRoute: true,
      });
      return switchTab({ url: finalUrl });
    }

    eventCenter.trigger("Navigation", {
      url: finalUrl,
    });

    return navigateTo({ url: finalUrl, ...option });
  }

  static navigateBack(option?: Taro.navigateBack.Option): Promise<TaroGeneral.CallbackResult> {
    eventCenter.trigger("Navigation", {
      navigateBack: true,
    });

    return navigateBack(option);
  }

  static reLaunch(option: ReLaunchOption) {
    eventCenter.trigger("Navigation", {
      reLaunch: true,
    });

    return reLaunch(option);
  }
}
