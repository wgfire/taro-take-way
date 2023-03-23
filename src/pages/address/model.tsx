import { createModel } from "@src/utils/mvp";

export interface AddressState {
  address: Array<{ content: string; tel: number; default: boolean; name: string }>;
}

export const defaultState: AddressState = {
  address: [
    {
      content: "深圳金地威新",
      tel: 16654232217,
      default: true,
      name: "姓名",
    },
    {
      content: "长沙金地威新",
      tel: 17754232217,
      default: false,
      name: "姓名",
    },
  ],
};
const { useModel, useHydrateState, atom } = createModel<AddressState>(defaultState);

export { useModel, useHydrateState, atom };
