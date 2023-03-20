import { Toast, ToastProps } from "@nutui/nutui-react-taro";
import { useState } from "react";

export interface NutToastProps {
  state: Partial<ToastProps>;
}
export const NutToast = (props: NutToastProps) => {
  const [state] = useState(
    Object.assign(props.state, {
      msg: "加载中...",
      type: "loading",
      cover: false,
      duration: 0,
      closeOnClickOverlay: false,
      icon: "",
      center: true,
      visible: true,
    })
  );

  return <Toast {...state}></Toast>;
};
