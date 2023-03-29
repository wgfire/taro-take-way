import { Tabs } from "@nutui/nutui-react-taro";
import { GoodsData, GoodsItemProps, MenuData } from "@src/apis/goods/get-goods-list";
import { Flex } from "@src/lib/components/basic/Flex";
import { PageView } from "@src/lib/components/layout/PageView";
import { StringUtil } from "@src/lib/utils/StringUtil";
import { useState } from "react";
import { Goods } from "../goods";

export interface NutTabsProps {
  onSelect(item: GoodsItemProps, type: string): void;
  total: number;
  goods: GoodsData;
  menus: Array<MenuData>;
}
export const NutTabs = (props: NutTabsProps) => {
  const [tabvalue, setTabvalue] = useState(1);
  const { total, onSelect, goods } = props;

  return (
    <Tabs
      style={{ height: "calc(100% - 100rpx)", marginTop: "0rpx" }}
      value={tabvalue}
      ellipsis
      type="smile"
      onChange={({ paneKey }) => {
        setTabvalue(paneKey);
      }}
      titleScroll
      direction="vertical"
    >
      {props.menus.map(item => (
        <Tabs.TabPane key={item.id} title={` ${item.name}`}>
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
                    key={StringUtil.uniqueId()}
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
