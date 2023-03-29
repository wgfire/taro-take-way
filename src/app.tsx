import { PropsWithChildren, useEffect } from "react";
import { useDidShow, useDidHide, useLaunch } from "@tarojs/taro";
import { checkUpdate } from "./utils/checkUpdate";
import { createExceptionCollector } from "./utils/exception/collector";
import { exceptionHandler } from "./exceptionHandler";

import "./app.scss";

import { usePresenter } from "./moduels/user/usePresenter";

// import { preflight } from "./utils/request";

createExceptionCollector(exceptionHandler);

function App(props: PropsWithChildren) {
  const { autoLogin } = usePresenter();
  useLaunch(() => {
    autoLogin();
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
