import React from "react";
import classnames from "classnames";
import { Flex } from "../../basic/Flex";
import type { FlexProps } from "../../basic/Flex";
import styles from "./index.module.scss";

export interface SafeAreaFooterProps extends FlexProps {}

export const SafeAreaFooter: React.FC<SafeAreaFooterProps> = React.memo(props => (
  <Flex {...props} className={classnames(styles.safeAreaInsetBottom, props.className)}>
    {props.children}
  </Flex>
));
