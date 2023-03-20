import React from "react";
import { Image, View, ViewProps } from "@tarojs/components";
import { paths } from "@src/config/env.config";
import "./index.scss";

const closeIcon = paths.url("/ycgmpfrontend/common/arrow-down.svg", "jcs");

interface FloatLayout extends ViewProps {
  isOpened: boolean;
  onClose?: Function;
  title?: string | React.ReactElement;
  after?: string | React.ReactElement;
  /** 设置关闭按钮的位置，left 左边，right 右边 */
  closeIconPosition?: "left" | "right";
}

/**
 * 注意：使用该组件时最好参考 AgreementStatement 组件的使用方式，在需要显示时才显示 插槽 内容，可以解决 IOS 滚动卡顿问题
 */
const FloatLayout: React.FC<FloatLayout> = ({ isOpened, onClose, closeIconPosition = "right", title, children, after }) => {
  const handleClose = () => {
    onClose?.();
  };

  return (
    <View className={isOpened ? "float-layout active" : "float-layout"}>
      <View className="float-layout__overlay" onClick={handleClose}></View>
      <View className="float-layout__container layout">
        {/* 头部，可自定义 */}
        {title && <View className="layout-header">{title}</View>}

        {/* 关闭按钮，保证各处统一，不提供自定义功能 */}
        <Image onClick={handleClose} className={`float-layout__close ${closeIconPosition}`} src={closeIcon} />

        {/* 内容 */}
        <View className="layout-body">{children}</View>

        {/* 底部内容 */}
        {after}
      </View>
    </View>
  );
};

export default FloatLayout;
