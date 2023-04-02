import { createModel } from "@src/utils/mvp";

export interface StateProps {
  showCar: boolean;
}
const state: StateProps = {
  showCar: false,
};

const { useModel, useHydrateState, atom } = createModel<StateProps>(state);

export { useModel, useHydrateState, atom };
