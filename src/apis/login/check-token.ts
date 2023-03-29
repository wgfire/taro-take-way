import { request } from "@src/utils/request";

export const checkWechatToken = () => {
  return request<string>({
    url: "/api/wechat/token/check",
    method: "POST",
  });
};
