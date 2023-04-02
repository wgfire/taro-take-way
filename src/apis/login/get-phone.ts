import { request } from "@src/utils/request";

export const getPhone = (params: { code: string }) => {
  return request<string>({
    url: "/api/wechat/get-phone-number",
    method: "POST",
    data: params,
  });
};
