import React from "react";

export interface TabPaneProps {
  title: React.ReactNode;
  index: number;
  children?: React.ReactElement;
}

export const TabPane: React.FC<TabPaneProps> = React.memo(props => {
  return props.children ?? null;
});
