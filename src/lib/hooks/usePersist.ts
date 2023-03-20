import React from "react";

/**
 * 功能同 useCallback，保存函数引用，但是不需要输入依赖项
 */
export function usePersist<T extends (...args: any[]) => any>(fn: T) {
  const ref = React.useRef<T>(fn);

  React.useEffect(() => {
    ref.current = fn;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(((...args) => ref.current(...args)) as T, []);
}
