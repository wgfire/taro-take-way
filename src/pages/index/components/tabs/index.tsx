import { Tabs } from "@nutui/nutui-react-taro";
import { Flex } from "@src/lib/components/basic/Flex";
import { PageView } from "@src/lib/components/layout/PageView";
import { View } from "@tarojs/components";
import { useState } from "react";
import { GoodsData, GoodsItemProps } from "../../model";
import { Goods } from "../goods";

export interface NutTabsProps {
  onSelect(item: GoodsItemProps, type: string): void;
  total: number;
  goods: GoodsData;
}
export const NutTabs = (props: NutTabsProps) => {
  const [tabvalue, setTabvalue] = useState("0");
  // const [total, onSelect] = useState(0);
  const { total, onSelect, goods } = props;
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
      style={{ height: "calc(100% - 100rpx)", marginTop: "0rpx" }}
      value={tabvalue}
      ellipsis
      onChange={({ paneKey }) => {
        setTabvalue(paneKey);
      }}
      titleScroll
      direction="vertical"
    >
      {list.map(item => (
        <Tabs.TabPane key={item.value} title={` ${item.text}`}>
          <Flex style={{ height: "100%" }}>
            <PageView.ScrollContent
              loadMore={{
                pageNum: 1,
                pageSize: 10,
                total: 20,
                enable: false,
                onLoadMore: () => {
                  console.log("远程加载");
                },
              }}
            >
              {goods.map(goodsItem => {
                return (
                  <Goods
                    key={goodsItem.id}
                    data={goodsItem}
                    onSelect={type => {
                      // const newTotal = Number(Number(total + value).toFixed(2));
                      onSelect(goodsItem, type);
                    }}
                  ></Goods>
                );
              })}
            </PageView.ScrollContent>
          </Flex>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
