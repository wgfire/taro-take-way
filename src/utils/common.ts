/** 将 search 解析为 query 对象 */
export const parseSearch = <Q extends {}>(search: `?${string}` = "?"): Q => {
  return search
    .slice(1)
    .split("&")
    .filter(Boolean)
    .map(_ => _.split("="))
    .reduce((prev, next) => {
      if (next) {
        prev[next[0]] = next[1] || "";
      }
      return prev;
    }, {} as Q);
};

/** 将 query 对象处理为 search 字符串 */
export const stringifyQuery = <Q extends {}>(queryObj: Q) => {
  const keys = Object.keys(queryObj);
  const str = keys.map(_ => `${_}=${encodeURIComponent(typeof queryObj[_] === "object" ? JSON.stringify(queryObj[_]) : queryObj[_])}`).join("&");
  return str && `?${str}`;
};

/** 生成随机色 */
export const rgb = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r},${g},${b})`;
};

export const getFilters = (filters: APIBodyFilterItem[]) => {
  filters.forEach(item => {
    item.condition = item.condition.filter(_ => _.value !== undefined && _.value !== "");
  });
  return filters.filter(item => item.condition.length !== 0);
};
