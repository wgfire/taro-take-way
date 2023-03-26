import { PropsWithChildren, useEffect } from "react";
import Taro, { useDidShow, useDidHide, useLaunch } from "@tarojs/taro";
import { checkUpdate } from "./utils/checkUpdate";
import { createExceptionCollector } from "./utils/exception/collector";
import { exceptionHandler } from "./exceptionHandler";

import "./app.scss";
import { getWechatLogin } from "./apis/login/get-wechat-login";

// import { preflight } from "./utils/request";

createExceptionCollector(exceptionHandler);

function App(props: PropsWithChildren) {
  useLaunch(() => {
    Taro.login({
      success: res => {
        console.log(res, "loginCode");
        getWechatLogin({ code: res.code });
      },
    });
  });

  useEffect(() => {
    // 检查小程序更新
    checkUpdate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidShow(() => {});
  useDidHide(() => {});

  return props.children;
}

export default App;
