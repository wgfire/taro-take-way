import { View, Image } from "@tarojs/components";
import { Text, type TextColor } from "@src/lib/components/basic/Text";
import React, { PureComponent } from "react";
import classnames from "classnames";
import chunk from "lodash/chunk";
import { Icon, type IconType } from "@src/lib/components/basic/Icon";
import { Flex } from "@src/lib/components/basic/Flex";
import styles from "./index.module.scss";

export type GridMenuItemIcon =
  | {
      type: IconType;
      activeColor?: TextColor;
      disabledColor?: TextColor;
    }
  | [activeUrl: string, disabledUrl?: string];

export interface GridMenuItem {
  icon: GridMenuItemIcon;
  text: React.ReactElement | string;
  disable?: boolean;
}

export interface GridMenuProps<M extends GridMenuItem> {
  /** 菜单数据 */
  menus: M[];
  /** 标题 */
  title?: React.ReactNode;
  /**
   * 列数
   * @default 4
   */
  column?: number;
  /** 样式 */
  style?: React.CSSProperties;
  /** 样式类 */
  className?: string;
  /** 点击事件 */
  onClick?: (item: M) => void;
}

export class GridMenu<M extends GridMenuItem> extends PureComponent<GridMenuProps<M>> {
  static defaultProps: PickOptional<GridMenuProps<any>> = {
    column: 4,
  };

  override render() {
    const { menus, title, column, style, className, onClick } = this.props;
    const items = chunk(menus, column).map<Array<M | null>>(item => {
      if (item.length < column!) {
        return item.concat(...Array(column! - item.length).fill(null));
      }
      return item;
    });
    return (
      <View className={classnames(styles.gridMenu, className)} style={style}>
        {title && (
          <View className={styles.title}>
            <Text size="30rpx" bold="500">{title}</Text>
          </View>
        )}
        <View>
          {items.map((row, rowIndex) => {
            return (
              <Flex key={rowIndex} className={styles.row}>
                {row.map((col, colIndex) => {
                  return (
                    <Flex
                      flexGrow={1}
                      flexShrink={0}
                      flexBasis={0}
                      flexDirection="column"
                      alignItems="center"
                      justifyContent="space-between"
                      key={colIndex}
                      className={styles.col}
                      onClick={() => col && onClick?.(col)}
                    >
                      {col && (
                        <React.Fragment>
                          {Array.isArray(col.icon) ? (
                            <Image mode="aspectFit" lazyLoad src={col.disable && col.icon[1] ? col.icon[1] : col.icon[0]} style={{ width: "50rpx", height: "50rpx" }} />
                          ) : (
                            <Icon style={{ fontSize: "50rpx" }} type={col.icon.type} color={col.disable ? col.icon.disabledColor : col.icon.activeColor} />
                          )}
                          <Text size="26rpx" color={col.disable ? "lightGray#999999" : "inherit"}>
                            {col.text}
                          </Text>
                        </React.Fragment>
                      )}
                    </Flex>
                  );
                })}
              </Flex>
            );
          })}
        </View>
      </View>
    );
  }
}
