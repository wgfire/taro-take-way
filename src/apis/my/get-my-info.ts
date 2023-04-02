import { request } from "@src/utils/request";

export interface userProps {
  image: string;
  nickname: string;
  rqId: number;
}
export const getMyInfo = () => {
  return request<userProps>({
    url: "/api/wechat/user/get-info",
    method: "POST",
  });
};
