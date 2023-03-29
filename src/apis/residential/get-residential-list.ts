import { request } from "@src/utils/request";

export interface ResidentialItem {
  id: number;
  name: string;
  image: string;
}
export type GetResidentialListResult = Array<ResidentialItem>;

export const getResidentialList = () => {
  return request<GetResidentialListResult>({
    url: "/api/wechat/residential-quarters/list",
    method: "POST",
  });
};
