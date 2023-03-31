import { GoodsData, GoodsItemProps, MenuData } from "@src/apis/goods/get-goods-list";

import { createModel } from "@src/utils/mvp";

export interface SelectGoodsProps extends GoodsItemProps {
  num: number;
}

export interface IndexState {
  total: number;
  selectGoods: Array<SelectGoodsProps>;
  expand: boolean;
  loading: boolean;
  menuData: Array<MenuData>;
  goodsData: GoodsData;
}

export const defaultState: IndexState = {
  total: 0,
  selectGoods: [],
  expand: false,
  loading: false,
  menuData: [
    { name: "水果", id: 0, sort: 1 },
    { name: "蔬菜", id: 1, sort: 2 },
    { name: "香蕉", id: 2, sort: 2 },
  ],
  goodsData: [
    {
      id: 1,
      menuId: 0,
      price: 6,
      name: "测试",
      image: "",
    },
  ],
};
const { useModel, useHydrateState, atom } = createModel<IndexState>(defaultState);

export { useModel, useHydrateState, atom };
