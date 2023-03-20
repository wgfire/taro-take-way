export class StringUtil {
  /** 生成唯一 id */
  static uniqueId() {
    return `_${Math.floor(Math.random() * 100000000).toString(16)}${Date.now().toString(16)}`;
  }

  /**
   *简单用正则校验手机号
   * @param value string
   * @returns true/false
   */
  static testPhone(value: string): boolean {
    const phoneExp = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
    return phoneExp.test(value);
  }

  /**
   * 邮箱判断
   */
  static testEmail(value: string): boolean {
    const emailExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailExp.test(value);
  }

  /**
   * 科学计数 或 字符串 转为万为单位的价格文本
   * @param value 价格数字
   * @param defaultStr 空占位
   * @returns
   */
  static formatPriceText(value?: string | number, defaultStr = "-") {
    value = Number(value); // 科学计数 或 字符串 转10进制数字
    if (!value || Number.isNaN(value)) {
      return defaultStr;
    }
    return `${(value / 10000).toFixed(2)}万元`;
  }
}
