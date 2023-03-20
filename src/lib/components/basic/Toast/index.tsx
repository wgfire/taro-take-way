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
      cover: true,
      duration: 0,
      coverColor: "rgba(0,0,0,0.1)",
      closeOnClickOverlay: false,
      icon: "",
      center: true,
      visible: true,
    })
  );

  return <Toast {...state}></Toast>;
};
