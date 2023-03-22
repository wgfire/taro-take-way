import { SelectGoodsProps } from "./model";

export const calculateTatal = (selectGood: Array<SelectGoodsProps>) => {
  const newTotal = selectGood.reduce((per, curr) => {
    return Number((per + curr.price * curr.num).toFixed(2));
  }, 0);
  return newTotal;
};
