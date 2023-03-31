import { request } from "@src/utils/request";

export interface GoodsItemProps {
  menuId: number;
  price: number;
  name: string;
  image: string;
  id: number;
}

export type GoodsData = Array<GoodsItemProps>;
export interface MenuData {
  id: number;
  name: string;
  sort: number;
}
export interface GetMenuGoodsListResult {
  goodsVOS: GoodsData;
  menuVOS: Array<MenuData>;
}

export const getMenuGoodsList = () => {
  return request<GetMenuGoodsListResult>({
    url: "/api/wechat/shop/menu-goods",
    method: "POST",
  });
};
