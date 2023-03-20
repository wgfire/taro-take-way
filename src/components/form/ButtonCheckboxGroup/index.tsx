import React from "react";
import chunk from "lodash/chunk";
import { ButtonCheckbox } from "../ButtonCheckbox";
import { Flex } from "@src/lib/components/basic/Flex";

export interface ButtonCheckboxGroupDataItem<T> {
  label: string;
  value: T;
}

export interface ButtonCheckboxGroupProps<T> {
  value?: T[];
  onChange?: (value?: T[]) => void;
  data: ButtonCheckboxGroupDataItem<T>[];
  /**
   * 列数
   * @default 4
   */
  column?: number;
}

export class ButtonCheckboxGroup<T> extends React.PureComponent<ButtonCheckboxGroupProps<T>> {
  static defaultProps: PickOptional<ButtonCheckboxGroupProps<any>> = {
    column: 4,
  };

  onChangeItem = (v: T) => {
    const { value = [] } = this.props;
    const copyValue = [...value];
    const index = copyValue?.findIndex(item => item === v);
    if (index > -1) {
      copyValue.splice(index, 1);
    } else {
      copyValue.push(v);
    }
    this.props.onChange?.(copyValue.length ? copyValue : undefined);
  };

  override render() {
    const { value, data, column } = this.props;

    const dataArray: (ButtonCheckboxGroupDataItem<T> | null)[][] = chunk(data, column!).map(item => (item.length === column ? item : item.concat(...Array(column! - item.length).fill(null))));

    return (
      <Flex flexDirection="column" gap="16rpx">
        {dataArray.map((row, rowIndex) => {
          return (
            <Flex gap="16rpx" key={`row-${rowIndex}`}>
              {row.map((col, colIndex) => {
                return col ? (
                  <ButtonCheckbox key={`col-${colIndex}`} flexGrow={1} flexBasis={0} checked={value?.includes(col.value)} onChange={() => this.onChangeItem(col.value)}>
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
