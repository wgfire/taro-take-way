import { usePersistMutex } from "@src/lib/hooks/usePersistMutex";
import type { Model } from "@src/utils/mvp";

export interface Option<S, I, Q extends ListQuery> {
  model: Model<S>;
  getScope: (state: S) => ListData<I, Q>;
  resetScopeState: () => void;
  getData: (query: Q) => Promise<{ data: I[]; total: number }>;
}

export const useFetchList = <S, I, Q extends ListQuery>(option: Option<S, I, Q>) => {
  const { model, getScope, resetScopeState, getData } = option;

  /** 通用查询，一般不直接使用 */
  const search: OptionalParamsMethod<Q> = async query => {
    try {
      const finalQuery = { ...getScope(model.state).query, ...query };
      model.setState(state => {
        const scope = getScope(state);
        scope.loading = true;
        scope.query = finalQuery;
      });

      const result = await getData(finalQuery);

      model.setState(state => {
        const scope = getScope(state);
		// TODO: push replace update 情况
        scope.list.push(result.data);
        scope.total = result.total;
      });
    } finally {
      model.setState(state => {
        const scope = getScope(state);
        scope.loading = false;
      });
    }
  };

  const searchAfterResetScope: OptionalParamsMethod<Q> = query => {
    resetScopeState();
    return search({ ...getScope(model.defaultState).query, ...query });
  };

  const searchMergeQueryAndBackToFirstPage: OptionalParamsMethod<Q> = query => {
    const prevQuery = getScope(model.state).query;
    resetScopeState();
    return search({ ...prevQuery, pageNum: 1, ...query });
  };

  const nextPage = usePersistMutex(() => search({ pageNum: getScope(model.state).query.pageNum + 1 }));

  const pullDownRefresh = async () => {
    await search({ pageNum: 1 });
    setTimeout(() => {
      model.setState(state => {
        const scope = getScope(state);
        const lastItem = scope.list[scope.list.length - 1];
        if (lastItem) {
          scope.list = [lastItem];
        }
      });
    });
  };

  const setQuery: OptionalParamsMethod<Q, void> = query => {
    model.setState(state => {
      Object.assign(getScope(state).query, query);
    });
  };

  return {
    model,
    /** 当前 hook 处理的数据 */
    scopeState: getScope(model.state),
    /** 一般在组件 didMount 后调用 */
    search,
    /** 一般用于输入框搜索 */
    searchAfterResetScope,
    /** 一般用于高级搜索 */
    searchMergeQueryAndBackToFirstPage,
    /** 下一页 */
    nextPage,
    /** 下拉刷新 */
    pullDownRefresh,
    /** 设置当前 scope 下的 query */
    setQuery,
  };
};
