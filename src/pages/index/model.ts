import { GetResidentialListResult } from "@src/apis/residential/get-residential-list";
import { createModel } from "@src/utils/mvp";

export interface GoodsItemProps {
  id: string;
  price: number;
}

export type GoodsData = Array<GoodsItemProps>;
export interface SelectGoodsProps extends GoodsItemProps {
  num: number;
}

export interface IndexState {
  total: number;
  selectGoods: Array<SelectGoodsProps>;
  expand: boolean;
  loading: boolean;
}

export const defaultState: IndexState = {
  total: 0,
  selectGoods: [],
  expand: false,
  loading: false,
};
const { useModel, useHydrateState, atom } = createModel<IndexState>(defaultState);

export { useModel, useHydrateState, atom };
