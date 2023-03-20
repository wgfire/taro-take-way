import { Flex } from "@src/lib/components/basic/Flex";
import { Tag, TagProps } from "@src/lib/components/basic/Tag";
import { Text } from "@src/lib/components/basic/Text";
import { View, type ITouchEvent } from "@tarojs/components";
import React from "react";
import classnames from "classnames";
import { Column } from "./Column";
import { Item } from "./Item";
import { Statistics } from "./Statistics";
import styles from "./index.module.scss";
import { Logo } from "../Logo";
import { Highlight } from "./Highlight";

export interface ListCardFooter {
  icon?: string;
  /** 图标名称，当图标地址加载错误或者不存在时，使用该值展示 */
  iconName?: string;
  content?: React.ReactNode;
  onClick?: (event: ITouchEvent) => void;
}

export interface ListCardTag extends Omit2<TagProps, "children"> {
  text: React.ReactNode;
}

export interface ListCardProps {
  /** 图标地址 */
  iconUrl?: string;
  /** 图标名称，当图标地址加载错误或者不存在时，使用该值展示 */
  iconName?: string;
  /** 标题 */
  title?: React.ReactNode;
  /** 标签 */
  tags?: ListCardTag[] | React.ReactElement;
  /** 底部内容 */
  footer?: ListCardFooter;
  /** 中间的内容区域 */
  children?: React.ReactNode;
  /** 容器样式 */
  style?: React.CSSProperties;
  /** 容器样式类 */
  className?: string;
  /** 点击事件 */
  onClick?: (event: ITouchEvent) => void;
}

export class ListCard extends React.PureComponent<ListCardProps> {
  /** icon-label-value 字段横向展示 */
  static Item = Item;

  /** label-value 竖向分栏展示 */
  static Column = Column;

  /** 统计数据 */
  static Statistics = Statistics;

  /** 高亮显示组件 */
  static Highlight = Highlight;

  override render() {
    const { iconUrl, iconName, title, tags, footer, children, style, className, onClick } = this.props;
    return (
      <View className={classnames(styles.listCard, className)} style={style} onClick={onClick}>
        <Flex flexDirection="column" flexGrow={1} gap="20rpx" className={styles.header}>
          <Flex alignItems="center" gap="26rpx">
            {(iconUrl || iconName) && (
              <Flex>
                <Logo url={iconUrl} text={iconName} />
              </Flex>
            )}
            <Flex flexDirection="column" flexGrow={1} gap="10rpx">
              {React.isValidElement(title) ? (
                title
              ) : (
                <Text size="32rpx" bold="500" className={styles.title}>
                  {title}
                </Text>
              )}

              {React.isValidElement(tags)
                ? tags
                : tags && (
                    <Flex gap="8rpx" flexWrap="wrap">
                      {tags.map((tagProps, index) => (
                        <Tag key={index} {...tagProps}>
                          {tagProps.text}
                        </Tag>
                      ))}
                    </Flex>
                  )}
            </Flex>
          </Flex>
          <Flex flexDirection="column" className={styles.content}>
            {children}
          </Flex>
        </Flex>
        {footer && (
          <Flex
            className={styles.footer}
            alignItems="center"
            onClick={event => {
              event.stopPropagation();
              footer.onClick?.(event);
            }}
          >
            {(footer.icon || footer.iconName) && (
              <Flex className={styles.icon}>
                <Logo url={footer.icon} text={footer.iconName} size="50rpx" />
              </Flex>
            )}

            {React.isValidElement(footer.content) ? (
              footer.content
            ) : (
              <Text size="24rpx" color="darkGray#666666">
                {footer.content}
              </Text>
            )}
          </Flex>
        )}
      </View>
    );
  }
}
