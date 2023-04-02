import { request } from "@src/utils/request";

export interface SubmitAddressParams {
  address: string;
  contacts: string;
  isDefault: boolean;
  phone: string;
}
export interface AddressItemProps {
  id?: number;
  address: string;
  contacts: string;
  isDefault?: boolean;
  phone: string;
}
export const SubmitAddressData = (params: AddressItemProps) => {
  return request<boolean>({
    url: "/api/wechat/address/create",
    method: "POST",
    data: params,
  });
};

export const deleteAddress = (params: { addressId: number }) => {
  return request<boolean>({
    url: "/api/wechat/address/delete",
    method: "POST",
    data: params,
  });
};
export const getAddressList = () => {
  return request<Array<AddressItemProps>>({
    url: "/api/wechat/address/list",
    method: "POST",
  });
};
export const updateAddress = (params: AddressItemProps) => {
  return request<boolean>({
    url: "/api/wechat/address/update",
    method: "POST",
    data: params,
  });
};
