import React from "react";
import { SinglePicker } from "../SinglePicker";

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
}

const getTimeList = () => {
  const list: string[] = [];
  for (let i = 7; i < 24; i++) {
    const str = i.toString().padStart(2, "0");
    list.push(`${str}:00`, `${str}:30`);
  }
  return list;
};

const timeStringArray = getTimeList();

export const TimePicker: React.FC<TimePickerProps> = React.memo(props => {
  return (
    <SinglePicker data={timeStringArray} value={props.value} onChange={props.onChange}>
      {props.children}
    </SinglePicker>
  );
});
