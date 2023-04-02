import { AddressItemProps } from "@src/apis/address/add-address";
import { createModel } from "@src/utils/mvp";

export interface AddressState {
  address: Array<AddressItemProps>;
  loading: boolean;
}

export const defaultState: AddressState = {
  address: [
    // {
    //   address: "深圳金地威新",
    //   phone: "16654232217",
    //   isDefault: true,
    //   contacts: "姓名",
    // },
  ],
  loading: true,
};
const { useModel, useHydrateState, atom } = createModel<AddressState>(defaultState);

export { useModel, useHydrateState, atom };
