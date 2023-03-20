import React from "react";

/** 定义类似 React.setState 函数声明 */
export type SetStateLikeMethod<S extends {}> = <K extends keyof S>(state: Pick<S, K> | ((prevState: Readonly<S>) => Pick<S, K> | S | null)) => void;

/**
 * 扩展 React.useState,使得支持类似 this.setState 的合并原 state 的功能
 * @param initialState
 * @returns [state, setState]
 * - setState 引用不变
 * - setState 为函数时，返回 null 则不更新组件
 */
export function useSetState<S extends {}>(initialState: S | (() => S)) {
  const [state, updateState] = React.useState(initialState);
  const setState = React.useCallback<SetStateLikeMethod<S>>(inputState => {
    updateState(s => {
      const newState = inputState instanceof Function ? inputState(s) : inputState;
      return newState ? { ...s, ...newState } : s;
    });
  }, []);
  return [state, setState] as const;
}
