import { PropsWithChildren, useEffect, useState } from "react";
import Taro, { useDidShow, useDidHide, useLaunch, eventCenter } from "@tarojs/taro";
import { checkUpdate } from "./utils/checkUpdate";
import { createExceptionCollector } from "./utils/exception/collector";
import { exceptionHandler } from "./exceptionHandler";

import "./app.scss";

import { usePresenter } from "./moduels/user/usePresenter";
import { Empty } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { useDidMount } from "./lib/hooks/lifecycle";

// import { preflight } from "./utils/request";

createExceptionCollector(exceptionHandler);

const App = (props: PropsWithChildren) => {
  const { autoLogin } = usePresenter();
  const [ready, setReady] = useState(false);
  useDidMount(async () => {
    await autoLogin();
    console.log("登录流程结束");
    setReady(true);

    eventCenter.on("login", async () => {
      Taro.showLoading({ title: "登录中..." });
      await autoLogin();
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
};

export default App;
