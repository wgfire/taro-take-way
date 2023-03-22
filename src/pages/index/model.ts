import { createModel } from "@src/utils/mvp";

export interface GoodsItemProps {
  id: string;
  price: number;
}

export type GoodsData = Array<GoodsItemProps>;

// const model = createModel()
