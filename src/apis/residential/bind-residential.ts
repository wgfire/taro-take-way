import { request } from "@src/utils/request";

export interface bindResidentialParams {
  id: number;
}

export const bindResidentialList = (params: bindResidentialParams) => {
  return request<boolean>({
    url: "/api/wechat/residential-quarters/bing",
    method: "POST",
    data: params,
  });
};