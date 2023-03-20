import React from "react";
import classnames from "classnames";
import { Flex, FlexItemProps } from "../Flex";
import { Text } from "../Text";
import { TabPane, TabPaneProps } from "./TabPane";
import styles from "./index.module.scss";

export { TabPane };

export interface TabsProps extends Pick<FlexItemProps, "flexShrink" | "flexGrow"> {
  current: number;
  onChange: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = React.memo(props => {
  const { current, onChange, className, style, children, ...restFlexProps } = props;
  const [activatedIndex, setActivatedIndex] = React.useState(() => new Set<number>()); // 缓存已经显示过的 TabPane

  React.useEffect(() => {
    setActivatedIndex(state => new Set(state.add(current)));
  }, [current]);

  const tabPanes = React.Children.toArray(children).filter((child): child is React.ReactElement<TabPaneProps> => React.isValidElement(child) && child.type === TabPane);

  return (
    <Flex flexDirection="column" className={classnames(styles.tabs, className)} style={style} {...restFlexProps}>
      <Flex flexBasis="80rpx" flexShrink={0} className={styles.header}>
        {tabPanes.map(item => {
          const isActive = current === item.props.index;
          return (
            <Flex
              key={item.props.index}
              flexGrow={1}
              flexBasis={0}
              flexShrink={0}
              justifyContent="center"
              alignItems="center"
              className={isActive && styles.activeTab}
              onClick={() => onChange(item.props.index)}
            >
              <Text color={isActive ? "inherit" : "darkGray#666666"} bold={isActive ? "500" : "normal"}>
                {item.props.title}
              </Text>
            </Flex>
          );
        })}
      </Flex>
      {tabPanes.map(pane => {
        const isActive = pane.props.index === props.current;
        return (
          activatedIndex.has(pane.props.index) && (
            <Flex key={pane.props.index} flexDirection="column" flexGrow={1} className={classnames(styles.content, !isActive && styles.hide)}>
              {pane}
            </Flex>
          )
        );
      })}
    </Flex>
  );
});
