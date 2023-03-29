import { Empty, Tabs } from "@nutui/nutui-react-taro";
import { GoodsData, GoodsItemProps, MenuData } from "@src/apis/goods/get-goods-list";
import { Flex } from "@src/lib/components/basic/Flex";
import { PageView } from "@src/lib/components/layout/PageView";
import { StringUtil } from "@src/lib/utils/StringUtil";
import { useEffect, useState } from "react";
import { Goods } from "../goods";

export interface NutTabsProps {
  onSelect(item: GoodsItemProps, type: string): void;
  goods: GoodsData;
  menus: Array<MenuData>;
}
export const NutTabs = (props: NutTabsProps) => {
  const [tabvalue, setTabvalue] = useState(0);
  const { onSelect, goods, menus } = props;

  const [currentGoods, setCurrentGoods] = useState<GoodsData>([]);

  useEffect(() => {
    const renderGood = goods.filter(el => el.menuId === tabvalue);
    setCurrentGoods(renderGood);
  }, [goods, setCurrentGoods, tabvalue]);

  useEffect(() => {
    setTabvalue(menus[0].id);
  }, [menus]);

  return (
    <Tabs
      style={{ height: "calc(100% - 100rpx)", marginTop: "0rpx" }}
      value={tabvalue}
      ellipsis
      type="smile"
      onChange={({ paneKey }) => {
        console.log(paneKey, "key");
        setTabvalue(Number(paneKey));
      }}
      titleScroll
      direction="vertical"
    >
      {props.menus.map(item => (
        <Tabs.TabPane key={item.id} title={` ${item.name}`} paneKey={item.id}>
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
              {currentGoods.length > 0 ? (
                currentGoods.map(goodsItem => {
                  return (
                    <Goods
                      key={StringUtil.uniqueId()}
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
            </PageView.ScrollContent>
          </Flex>
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};
