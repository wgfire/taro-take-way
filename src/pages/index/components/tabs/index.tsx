import { Tabs } from "@nutui/nutui-react-taro";
import { useState } from "react";
import { Goods } from "../goods";
import { TabContent } from "./tabContent";

export const NutTabs = () => {
  const [tab5value, setTab5value] = useState("0");
  const list = [
    {
      text: "水果",
      value: "0",
    },
    {
      text: "橘子",
      value: "1",
    },
    {
      text: "蔬菜",
      value: "2",
    },
  ];
  return (
    <Tabs
      style={{ height: "100%", marginTop: "6rpx" }}
      value={tab5value}
      ellipsis
      onChange={({ paneKey }) => {
        setTab5value(paneKey);
      }}
      titleScroll
      direction="vertical"
    >
      {list.map(item => (
        <Tabs.TabPane key={item.value} title={` ${item.text}`}>
          <TabContent>
            <Goods
              onSelect={value => {
                console.log(value);
                const newTotal = Number(value.toFixed(2));
                console.log(newTotal);
              }}
            ></Goods>
          </TabContent>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
