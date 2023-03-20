import { MessageException, NetworkException } from "./utils/exception/index";
import { GlobalException } from "./utils/exception";
import Taro, { getCurrentPages } from "@tarojs/taro";
import { ERROR_CODE } from "./utils/errorCode";

const reLaunchLogin = () => Taro.reLaunch({ url: "/pages/login/index" });

export const exceptionHandler = (exception: GlobalException) => {
  console.groupCollapsed("%c全局异常", "color: red;font-size: 14px;");
  console.error(exception);
  console.groupEnd();

  // 接口业务异常
  if (exception instanceof MessageException) {
    if ([ERROR_CODE.USER_UNBIND, ERROR_CODE.TOKEN_ERROR].includes(exception.code)) {
      reLaunchLogin();
      return;
    }

    // 用户被禁用
    if (ERROR_CODE.USER_FORBIDDEN === exception.code) {
      // TODO: 可能后续会有一个页面展示状态，而不是直接跳转到登录。

      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const url = `/${currentPage.route}`;

      if (url !== '/pages/login/index') {
        // toast完成后才跳转，避免toast闪一下
        setTimeout(() => {
          reLaunchLogin();
        }, 1000);
      }

      Taro.showToast({
        icon: "none",
        title: exception.message,
      });
      return;
    }

    Taro.showToast({
      icon: "none",
      title: exception.message,
    });
  }

  if (exception instanceof NetworkException) {
    Taro.showToast({
      icon: "none",
      title: exception.message,
    });
  }
};
