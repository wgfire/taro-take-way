import { Menu, MenuItem } from "@nutui/nutui-react-taro";
import { useState } from "react";

export const MenuOptions = () => {
  const [options] = useState([
    { text: "全部地区", value: 0 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
    { text: "上海", value: 1 },
    { text: "北京", value: 2 },
    { text: "天津", value: 3 },
    { text: "广州", value: 4 },
  ]);
  const [options1] = useState([
    { text: "默认排序", value: "a" },
    { text: "好评排序", value: "b" },
    { text: "销量排序", value: "c" },
  ]);

  return (
    <Menu>
      <MenuItem options={options} value={0}  />
    </Menu>
  );
};
