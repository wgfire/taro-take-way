import React from "react";
import classnames from "classnames";
import { Flex } from "../../basic/Flex";
import type { FlexProps } from "../../basic/Flex";
import styles from "./index.module.scss";

export interface ContentProps extends FlexProps {
  /** 是否具有外边距 */
  hasMargin?: boolean;
}

export const Content: React.FC<ContentProps> = React.memo(props => {
  const { className, hasMargin, children, ...restProps } = props;
  return (
    <Flex {...restProps} className={classnames(styles.content, hasMargin && styles.hasMargin, className)}>
      {children}
    </Flex>
  );
});

Content.defaultProps = {
  flexDirection: "column",
  flexGrow: 1,
};
