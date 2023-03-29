import { createModel } from "@src/utils/mvp";

export interface UserState {
  token: string | null;
}

export const defaultState: UserState = {
  token: null,
};
const { useModel, useHydrateState, atom } = createModel<UserState>(defaultState);

export { useModel, useHydrateState, atom };
