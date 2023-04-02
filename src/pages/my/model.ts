import { userProps } from "@src/apis/my/get-my-info";
import { createModel } from "@src/utils/mvp";

export interface MyState {
  userInfo: userProps;
}

export const defaultState: MyState = {
  userInfo: {
    nickname: "姓名",
    image: "",
    rqId: 0,
  },
};
const { useModel, useHydrateState, atom } = createModel<MyState>(defaultState);

export { useModel, useHydrateState, atom };
