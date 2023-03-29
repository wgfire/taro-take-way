/**
 * 微信登录
 */

import { request } from "@src/utils/request";

export interface GetWechatLoginParams {
  code: string;
}
export const getWechatLogin = (params: GetWechatLoginParams) => {
  return request<string>({
    url: "/api/wechat/login",
    method: "POST",
    data: params,
  });
};
