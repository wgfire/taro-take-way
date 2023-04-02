import { Animate, Empty, Tabs } from "@nutui/nutui-react-taro";
import { GoodsData, GoodsItemProps, MenuData } from "@src/apis/goods/get-goods-list";
import { Flex } from "@src/lib/components/basic/Flex";
import { PageView } from "@src/lib/components/layout/PageView";
import React, { useEffect, useRef, useState } from "react";

import { Goods } from "../goods";
import { ScrollView } from "@tarojs/components";
import { usePresenter } from "../../presenter";

export interface NutTabsProps {
  onSelect(item: GoodsItemProps, type: string): void;
  goods: GoodsData;
  menus: Array<MenuData>;
}
export const NutTabs = React.memo((props: NutTabsProps) => {
  const { onSelect, goods, menus } = props;
  const [tabvalue, setTabvalue] = useState(menus[0].id);
  const [currentGoods, setCurrentGoods] = useState<GoodsData>(goods.filter(el => el.menuId === tabvalue));
  const { model } = usePresenter();
  const [height, setHeight] = useState(100);
  useEffect(() => {
    setTimeout(() => {
      const renderGood = goods.filter(el => el.menuId === tabvalue);
      setCurrentGoods(renderGood);
    }, 16);
  }, [goods, setCurrentGoods, tabvalue]);
  useEffect(() => {
    setHeight(model.state.expand ? 200 : 100);
  }, [model.state.expand]);
  useEffect(() => {
    console.log(currentGoods, "当前");
  }, [currentGoods]);

  return (
    <Tabs
      style={{ height: `calc(100% - ${height}rpx)`, marginTop: "0rpx", overflow: "hidden" }}
      animatedTime={300}
      value={tabvalue}
      ellipsis
      type="smile"
      onChange={({ paneKey }) => {
        console.log(paneKey);
        setTabvalue(paneKey as unknown as number);
      }}
      titleScroll
      direction="vertical"
    >
      {props.menus.map(item => (
        <Tabs.TabPane key={item.id} title={`${item.name}`} paneKey={item.id}>
          <ScrollView style={{ height: "100%" }} scrollY>
            {currentGoods.length > 0 ? (
              currentGoods.map(goodsItem => {
                return (
                  <Goods
                    key={goodsItem.unid}
                    data={goodsItem}
                    onSelect={type => {
                      onSelect(goodsItem, type);
                    }}
                  ></Goods>
                );
              })
            ) : (
              <Empty></Empty>
            )}
          </ScrollView>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
});
