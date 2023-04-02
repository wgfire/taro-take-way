/** 2023年/四月/01日/星期六
*@reviewType.Perf
*@reviewContent By Name
1.提交订单
*/

import { request } from "@src/utils/request";

export interface SubmitOrderParams {
  addressId: number;
  orderGoodsIds: Array<number>;
  remarks: string;
  totalPrice: number;
}

export const submitOrder = (params: SubmitOrderParams) => {
  return request<any>({
    url: "/api/wechat/order/create",
    method: "POST",
    data: params,
  });
};
