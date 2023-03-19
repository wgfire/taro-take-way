import React, { useState } from "react";
import { Tabs } from "@nutui/nutui-react-taro";
import styles from "./index.module.scss";
import { Goods } from "./Goods";
import { TabContent } from "./TabContent";

export interface NutTabsProps {
  onSelect?: (price: number) => void;
}
export const NutTabs = (props: NutTabsProps) => {
  const [tab6value, setTab6value] = useState("0");
  const [total, setTotal] = useState(0);
  const list5 = [
    {
      text: "零食",
      value: "0",
    },
    {
      text: "水果",
      value: "1",
    },
    {
      text: "蔬菜",
      value: "2",
    },
  ];
  return (
    <>
      <Tabs
        className={styles.nutTabs}
        value={tab6value}
        onChange={({ paneKey }) => {
          setTab6value(paneKey);
        }}
        titleScroll
        direction="vertical"
      >
        {list5.map((item) => (
          <Tabs.TabPane
            key={item.value}
            title={`${item.text}`}
            className={styles.nutTitle}
          >
            <TabContent>
              <Goods
                onSelect={(value) => {
                  console.log(value);
                  const newTotal = Number(value.toFixed(2));
                  setTotal(newTotal);
                  props.onSelect?.(newTotal);
                }}
              ></Goods>
              <Goods
                onSelect={(value) => {
                  console.log(value);
                  const newTotal = Number(value.toFixed(2));
                  setTotal(newTotal);
                  props.onSelect?.(newTotal);
                }}
              ></Goods>
              <Goods
                imgUrl="https://img.ehmall.com.cn/shop/store/goods/1/2021/05/24/1_06751818952682744.jpg?imageView2/3/w/1280/h/1280/q/85!"
                onSelect={(value) => {
                  console.log(value);
                  const newTotal = Number(value.toFixed(2));
                  setTotal(newTotal);
                  props.onSelect?.(newTotal);
                }}
              ></Goods>
              <Goods
                imgUrl="https://www.penzai.com/uploads/img/202005/23/1590247997423469.jpg"
                onSelect={(value) => {
                  console.log(value);
                  const newTotal = Number(value.toFixed(2));
                  setTotal(newTotal);
                  props.onSelect?.(newTotal);
                }}
              ></Goods>
            </TabContent>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </>
  );
};
