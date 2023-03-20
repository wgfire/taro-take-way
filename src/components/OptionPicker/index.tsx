import React, { useEffect, useMemo } from "react";
import { Picker } from "@tarojs/components";
import { usePresenter as useOptionsPresenter } from "@src/moduels/options/presenter";

import { TagKeys } from "@src/apis/common/get-all-options";

export interface OptionPickerProps {
  value: string | number,
  dataType: TagKeys,
  onChange?: (value: string | number, item: any) => void;
  children: React.ReactNode | ((value: string | number, text: string, item: any) => React.ReactNode);
}

// TODO: 改为受控组件

/**
 * 文字图标
 * @description 文字颜色默认为白色，背景随机，自定义字体和背景可使用style或者className
 */
export const OptionPicker: React.FC<OptionPickerProps> = React.memo(props => {
  const { model, getAllFilterOptionsByKeys } = useOptionsPresenter();
  const { value, dataType, onChange, children } = props;

  const dataSource = [{ text: '全部', value: '' }, ...(model.state[dataType] || [])] ;

  // 用于picker组件定位
  const index = useMemo(() => {
    return dataSource.findIndex((item: { value: string | number; }) => item.value === value);
  }, [value, dataSource]);

  const item = useMemo(() => {
    return dataSource.find((item: { value: string | number; }) => item.value === value);
  }, [value, dataSource]);

  useEffect(() => {
    getAllFilterOptionsByKeys([dataType]);
  }, [dataType]);

  function handleChange(selected: string | number) {
    const dataItem = dataSource[selected];
    onChange && onChange(dataItem.value, dataItem);
  }

  return (
    <Picker mode="selector" value={index} range={dataSource} rangeKey="text" onChange={(e) => handleChange(e.detail.value)}>
      {typeof children === 'function' ? children(value, item.text, item) : children }
    </Picker>
  );
});

OptionPicker.defaultProps = {};
