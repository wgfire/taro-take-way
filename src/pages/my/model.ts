import { createModel } from "@src/utils/mvp";

export interface MyState {
  userInfo: {
    name: string;
  };
}

export const defaultState: MyState = {
  userInfo: {
    name: "test",
  },
};
const { useModel, useHydrateState, atom } = createModel<MyState>(defaultState);

export { useModel, useHydrateState, atom };
