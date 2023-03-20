import React from "react";
import classnames from "classnames";
import { SafeAreaFooter } from "../SafeAreaFooter";
import type { SafeAreaFooterProps } from "../SafeAreaFooter";
import styles from "./index.module.scss";

export interface FooterProps extends SafeAreaFooterProps {}

export const Footer: React.FC<FooterProps> = React.memo(props => <SafeAreaFooter {...props} flexShrink={0} className={classnames(styles.footer, props.className)} />);
