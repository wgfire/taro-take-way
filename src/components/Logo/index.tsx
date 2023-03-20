import React from "react";
import classnames from "classnames";
import { Image } from "@tarojs/components";
import { TextLogo, type TextLogoProps } from "@src/components/TextLogo";
import styles from "./index.module.scss";

export interface LogoProps extends TextLogoProps {
  url?: string;
}

export const Logo: React.FC<LogoProps> = React.memo(props => {
  const { url, text, size, className, style } = props;
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    // 每次 url 更新后，并且 url 存在，那么重新加载新的 url
    if (url) {
      setIsError(false);
    }
  }, [url]);

  if (url && !isError) {
    return <Image mode="aspectFit" lazyLoad src={url} onError={() => setIsError(true)} className={classnames(styles.image, className)} style={{ ...style, width: size, height: size }} />;
  }
  if (text) {
    return <TextLogo text={text} size={size} className={classnames(styles.text, className)} style={style}></TextLogo>;
  }
  return null;
});

Logo.defaultProps = {
  size: "70rpx",
};
