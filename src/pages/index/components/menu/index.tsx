import { Menu, MenuItem } from "@nutui/nutui-react-taro";
import { useState } from "react";

export interface NutMenuProps {}
export const NutMenu = () => {
  const [options] = useState([
    { text: "全部地区", value: 0 },
    { text: "北京", value: 1 },
    { text: "上海", value: 2 },
  ]);
  return (
    <div className="demo full">
      <Menu activeColor="black">
        <MenuItem options={options} value={0} />
      </Menu>
    </div>
  );
};
