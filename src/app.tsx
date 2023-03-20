import { PropsWithChildren, useEffect } from "react";
import { useDidShow, useDidHide } from "@tarojs/taro";
import { checkUpdate } from "./utils/checkUpdate";
import { createExceptionCollector } from "./utils/exception/collector";
import { exceptionHandler } from "./exceptionHandler";

import "./app.scss";
// import { preflight } from "./utils/request";

createExceptionCollector(exceptionHandler);

function App(props: PropsWithChildren) {


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
