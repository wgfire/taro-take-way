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
  menuData: [],
  goodsData: [],
};
const { useModel, useHydrateState, atom } = createModel<IndexState>(defaultState);

export { useModel, useHydrateState, atom };
