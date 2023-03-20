import React from "react";

/**
 * 返回组件是否第一次渲染
 */
export function useIsFirstRender() {
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    isFirstRender.current = false;
  });
  return React.useCallback(() => isFirstRender.current, []);
}

/**
 * 返回组件挂载状态的函数，该函数引用唯一
 * @return `() => boolean`
 * @example
 * ```tsx
 * const isMount = useMountedStatus()
 * const Test = React.useCallback(async => {
 *  await delay(2000)
 *  if (isMount()) {
 *    // do nothing
 *  }
 * }, [isMount])
 * ```
 */
export function useMountedStatus() {
  const isMount = React.useRef(true);
  useWillUnmount(() => {
    isMount.current = false;
  });
  return React.useCallback(() => isMount.current, []);
}

/**
 * 组件加载完成
 * @param effect
 */
export function useDidMount(fn: () => void | Promise<void>, use: "useLayoutEffect" | "useEffect" = "useEffect") {
  React[use](() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/**
 * 组件将要卸载
 * @param fn
 */
export function useWillUnmount(fn: () => void) {
  const fnRef = React.useRef(fn);
  React.useEffect(() => {
    fnRef.current = fn;
  });
  React.useEffect(() => () => fnRef.current(), []);
}

/**
 * 组件更新
 * @param callback
 * @param deps
 */
export function useDidUpdate(fn: () => void, deps?: React.DependencyList) {
  const isFirstRender = useIsFirstRender();
  React.useEffect(() => {
    if (!isFirstRender()) {
      fn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * 强制刷新组件
 */
export function useForceUpdate() {
  const [, add] = React.useState(false);
  return React.useCallback(() => add(prev => !prev), []);
}
