import Taro from "@tarojs/taro";

export class StorageUtil<T extends PlainObject> {
  set<K extends keyof T>(key: K & string, data: T[K]) {
    return Taro.setStorageSync(key, data);
  }

  /**
   * 获取 storage 中的值
   * @param key
   * @returns 当 key 不存在时，返回 null
   */
  get<K extends keyof T>(key: K & string): T[K] | null {
    const data = Taro.getStorageSync(key);
    // 小程序中，key 不存在时，会默认返回空字符串，这里处理默认返回 null
    if (data !== "" || Taro.getStorageInfoSync().keys.includes(key)) {
      return data;
    }
    return null;
  }

  /** 删除 storage 中的 key */
  remove(key: keyof T & string) {
    return Taro.removeStorageSync(key);
  }
}
