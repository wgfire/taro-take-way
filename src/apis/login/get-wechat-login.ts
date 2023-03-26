/**
 * 微信登录
 */

import { request } from "@src/utils/request";

export interface GetWechatLoginParams {
  code: string;
}
export const getWechatLogin = (params: GetWechatLoginParams) => {
  return request<ResponseBody<any>>({
    url: "/api/wechat/login",
    method: "POST",
    data: params,
  });
};
