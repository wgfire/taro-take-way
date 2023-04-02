import { createModel } from "@src/utils/mvp";

export interface OrderState {
  address: string;
  id:number
}

export const defaultState: OrderState = {
  address: "",
  id:0
};
const { useModel, useHydrateState, atom } = createModel<OrderState>(defaultState);

export { useModel, useHydrateState, atom };
