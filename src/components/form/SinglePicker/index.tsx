import { Picker } from "@tarojs/components";
import React from "react";

export interface SinglePickerProps<T> {
  value?: T;
  onChange?: (value: T) => void;
  data: T[];
  children?: React.ReactNode;
}

/** 单列通用的选择器 */
export class SinglePicker<T extends string | number | Record<string, any>> extends React.PureComponent<SinglePickerProps<T>> {
  override render() {
    const { value, onChange, data, children } = this.props;

    const index = data.findIndex(item => item === value);

    return (
      <Picker mode="selector" range={data as any[]} value={index} onChange={event => onChange?.(data[event.detail.value])}>
        {children}
      </Picker>
    );
  }
}
