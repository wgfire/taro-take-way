import { GoodsData, GoodsItemProps, MenuData } from "@src/apis/goods/get-goods-list";
import React, { useEffect, useState } from "react";

import { View } from "@tarojs/components";
import { usePresenter } from "../../presenter";
import { Tabs } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { TabContent } from "./TabContent";

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
    console.log(tabvalue);
    Taro.showToast({
      title: "加载中",
      icon: "loading",
      duration: 1000,
    });
    const renderGood = goods.filter(el => el.menuId === tabvalue);
    console.log(renderGood, "x");

    setTimeout(() => {
      setCurrentGoods(renderGood);
      Taro.hideToast();
    }, 0);
    //   setCurrentGoods(renderGood);
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
      type="smile"
      onChange={({ paneKey }) => {
        setTabvalue(paneKey as unknown as number);
      }}
      titleScroll
      direction="vertical"
    >
      {props.menus.map(item => (
        <Tabs.TabPane key={item.id} title={`${item.name}`} paneKey={item.id}>
          <View style={{ height: "100%" }}>
            <TabContent
              key={item.id}
              data={goods.filter(el => el.menuId === item.id)}
              onSelect={(goodsItem, type) => {
                onSelect(goodsItem, type);
              }}
            ></TabContent>
            {/* {currentGoods.length > 0 ? (
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
            )} */}
          </View>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
});
