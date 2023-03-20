/**
 * 列表查询的标准接口
 */
interface ListData<T, Q extends ListQuery = ListQuery> {
  /** 
   * 加载中
   * @description 设置为 null，可代表第一次加载
   */
  loading: boolean | null;
  /** 列表查询条件 */
  query: Q;
  /** 列表数据 */
  list: T[][];
  /** 总个数 */
  total: number;
}
interface ListQuery {
  pageSize: number;
  pageNum: number;
}
