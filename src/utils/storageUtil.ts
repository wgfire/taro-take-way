import { StorageUtil } from "@src/lib/utils/StorageUtil";

/**
 * 本地存储的数据
 */
export interface StorageData {
  // wechat: {
  //   openid: string;
  //   unionid: string;
  // } | null;
  /** 用户手机号 */
  mobile: string | null;
  /** 用户token */
  token: string | null;
  /** 用户openid */
  openid: string | null;
  /** 用户头像（微信） */
  avatar: string | null;
  /** 用户获取手机号的code，用于用户绑定、用户申请 */
  mobileCode: string | null;
}

export const storageUtil = new StorageUtil<StorageData>();
