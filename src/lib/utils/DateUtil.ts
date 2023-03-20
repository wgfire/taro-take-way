import dayjs, { Dayjs } from "dayjs";

export type DateFormatType = "YYYY-MM-DD HH:mm:ss" | "YYYY-MM-DD HH:mm" | "YYYY-MM-DD";

export class DateUtil {
  /**
   * 格式化时间
   * @param date 任何时间
   * @param type 格式化类型
   * @param defaultStr 转换失败时候，默认的返回值
   */
  static format(date?: Dayjs | Date | string | null, formatString: DateFormatType = "YYYY-MM-DD", defaultStr = "-") {
    if (date) {
      const formattedDate = dayjs(date);
      if (formattedDate.isValid()) {
        return formattedDate.format(formatString);
      }
    }
    return defaultStr;
  }
}
