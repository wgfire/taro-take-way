import React from "react";
import chunk from "lodash/chunk";
import { ButtonCheckbox } from "../ButtonCheckbox";
import { Flex } from "@src/lib/components/basic/Flex";

export interface ButtonRadioGroupDataItem<T> {
  label: string;
  value: T;
}

export interface ButtonRadioGroupProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  data: ButtonRadioGroupDataItem<T>[];
  /**
   * 列数
   * @default 4
   */
  column?: number;
}

export class ButtonRadioGroup<T> extends React.PureComponent<ButtonRadioGroupProps<T>> {
  static defaultProps: PickOptional<ButtonRadioGroupProps<any>> = {
    column: 4,
  };

  override render() {
    const { value, data, onChange, column } = this.props;

    const dataArray: (ButtonRadioGroupDataItem<T> | null)[][] = chunk(data, column!).map(item => (item.length === column ? item : item.concat(...Array(column! - item.length).fill(null))));

    return (
      <Flex flexDirection="column" gap="16rpx">
        {dataArray.map((row, rowIndex) => {
          return (
            <Flex gap="16rpx" key={`row-${rowIndex}`}>
              {row.map((col, colIndex) => {
                return col ? (
                  <ButtonCheckbox key={`col-${colIndex}`} flexGrow={1} flexBasis={0} checked={value === col.value} onChange={() => onChange?.(col.value)}>
                    {col.label}
                  </ButtonCheckbox>
                ) : (
                  <Flex key={`col-${colIndex}`} flexGrow={1} flexBasis="32rpx" />
                );
              })}
            </Flex>
          );
        })}
      </Flex>
    );
  }
}
