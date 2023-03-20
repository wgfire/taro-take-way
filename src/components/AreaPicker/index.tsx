import React, { useEffect, useMemo, useState } from "react";
import { Picker } from "@tarojs/components";
import { usePresenter as useOptionsPresenter } from "@src/moduels/options/presenter";

export interface AreaPickerProps {
  value: string[],
  onChange?: (value: string[], item: any[]) => void;
  children: React.ReactNode | ((value: string[], text: string[], items: any[]) => React.ReactNode);
}

// TODO: 重构为受控组件

/**
 * 文字图标
 * @description 文字颜色默认为白色，背景随机，自定义字体和背景可使用style或者className
 */
export const AreaPicker: React.FC<AreaPickerProps> = React.memo(props => {
  const { value, onChange, children } = props;

  const { model, getAllFilterOptionsByKeys } = useOptionsPresenter();
  const [pickerValue, setPickerValue] = useState<string[]>(value);
  const [pickerItem, setPickerItem] = useState<any>([]);

  useEffect(() => {
    getAllFilterOptionsByKeys(["area"]);
  }, []);

  const dataSource = model.state.area || [];

  // 提供给picker使用
  const dataRange = useMemo(() => {
    return [
      dataSource.filter((item: { parent: string }) => ["-1", "0"].includes(item.parent)),
      pickerValue?.[0] === '-1' ? [] : dataSource.filter((item: { parent: string }) => item.parent === pickerValue?.[0]),
    ];
  }, [dataSource, pickerValue]);

  // 用于picker组件定位
  const indexs = useMemo(() => {
    return pickerValue.map((val, i) => {
      if (!dataRange[i]) {
        return undefined;
      }

      return dataRange[i].findIndex((item: { value: string }) => item.value === val);
    });
  }, [pickerValue, dataRange]);

  useEffect(() => {
    const items = value.map((val) => {
      return dataSource.find((item: { value: string; }) => item.value === val) || {};
    });

    setPickerItem(items)
  }, [dataSource, value]);

  function handleColumnChange(column: number, value: number) {
    const dataItem = dataRange[column][value];

    const arr = [...pickerItem];
    arr[column] = dataItem;

    setPickerValue(arr.map(item => item.value));
    setPickerItem(arr);
  }

  function handleChange(selected: number[]) {
    const parent = dataRange[0][selected[0]];
    const item = dataRange[1][selected[1]];

    onChange && onChange([parent.text, item.text], [parent, item]);
  }

  return (
    <Picker mode="multiSelector" value={indexs} range={dataRange} rangeKey="text" onColumnChange={e => handleColumnChange(e.detail.column, e.detail.value)} onChange={(e) => handleChange(e.detail.value)}>
      {typeof children === 'function' ? children(pickerValue, pickerItem.map((item: { text: any; }) => item.text), pickerItem) : children }
    </Picker>
  );
});

AreaPicker.defaultProps = {};
