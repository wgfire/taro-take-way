/** 任意 key -> value 的简单对象 */
type PlainObject<T = any> = Record<string, T>;

/**
 * 获取可选字段, 用于 React 类组件的默认属性类型声明
 * @example
 *
 * static defaultProps: PickOptional<Props> = {}
 */
type PickOptional<T> = Pick<T, { [K in keyof T]-?: Record<string, never> extends { [P in K]: T[K] } ? K : never }[keyof T]>;

/** 更加严格的 Omit */
type Omit2<T, K extends keyof T> = Omit<T, K>;

/** 更严格的 Extract  */
type Extract2<T, K extends T> = Extract<T, K>;

/** 更严格的 Exclude  */
type Exclude2<T, K extends T> = Exclude<T, K>;

/**
 * 可选查询参数的函数定义，一般结合 hooks 定义查询数据的函数
 * @example
 *
 * const getDiagnosesList = React.useCallback<OptionalQueryParamsMethod<State>>(
 *  async query => {
 *    const finalQuery = { ...state.query, ...query } // 合并搜索条件
 *    const result = await fetch(finalQuery)
 *  },
 * [state, store, setState]
 * )
 */
type OptionalParamsMethod<S extends PlainObject, R = Promise<void>> = <K extends keyof S>(state?: Pick<S, K>) => R;
