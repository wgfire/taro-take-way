/** 购物车结算 */

import { request } from "@src/utils/request";

export const setShopGoodsData = (params: { goodsIds: Array<number> }) => {
  return request<any>({
    url: "/api/wechat/shopping-cart/to-settle",
    method: "POST",
    data: params,
  });
};

export const addShopCarData = (params: { goodsId: number; operation: 1 | -1 }) => {
  return request<any>({
    url: "/api/wechat/shopping-cart/operation",
    method: "POST",
    data: params,
  });
};

export const clearShopCar = (params: { goodsIds: Array<number> }) => {
  return request<any>({
    url: "/api/wechat/shopping-cart/clear",
    method: "POST",
    data: params,
  });
};
export const getShopCarData = () => {
  return request<any>({
    url: "/api/wechat/shopping-cart/get-data",
    method: "POST",
  });
};
