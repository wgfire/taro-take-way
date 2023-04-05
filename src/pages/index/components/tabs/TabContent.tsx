import { GoodsData, GoodsItemProps } from "@src/apis/goods/get-goods-list";
import { ScrollView } from "@tarojs/components";
import { Goods } from "../goods";
import { Empty } from "@nutui/nutui-react-taro";
import React from "react";

export interface TabContentProps {
  data: GoodsData;
  onSelect: (item: GoodsItemProps, type: string) => void;
}
export const TabContent = React.memo((props: TabContentProps) => {
  const currentGoods = props.data;
  return (
    <ScrollView scrollY>
      {currentGoods.length > 0 ? (
        currentGoods.map(goodsItem => {
          return (
            <Goods
              key={goodsItem.unid}
              data={goodsItem}
              onSelect={type => {
                props.onSelect(goodsItem, type);
              }}
            ></Goods>
          );
        })
      ) : (
        <Empty></Empty>
      )}
    </ScrollView>
  );
});
