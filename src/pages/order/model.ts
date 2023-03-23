import { createModel } from "@src/utils/mvp";

export interface OrderState {
  address: string;
}

export const defaultState: OrderState = {
  address: "",
};
const { useModel, useHydrateState, atom } = createModel<OrderState>(defaultState);

export { useModel, useHydrateState, atom };
