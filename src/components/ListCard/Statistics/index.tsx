import { Flex } from "@src/lib/components/basic/Flex";
import { Text } from "@src/lib/components/basic/Text";
import React from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

export interface StatisticsDataItem {
  label: string;
  value: string | number;
}

export interface StatisticsProps {
  data?: StatisticsDataItem[];
  style?: React.CSSProperties;
  className?: string;
}

export const Statistics: React.FC<StatisticsProps> = React.memo(props => {
  return (
    <Flex alignItems="center" justifyContent="space-around" className={classnames(styles.statistics, props.className)} style={props.style}>
      {props.data?.map((item, index) => {
        return (
          <Flex key={index} flexDirection="column" alignItems="center">
            <Text>{item.value}</Text>
            <Text size="22rpx" color="lightGray#999999">
              {item.label}
            </Text>
          </Flex>
        );
      })}
    </Flex>
  );
});
