import React from "react";
import produce from "immer";
import { atom, useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

export interface Model<S> {
  state: S;
  /** 只读，禁止修改 */
  readonly defaultState: S;
  setState: <K extends keyof S>(newState: Pick<S, K> | ((draft: S) => void)) => void;
  resetState: () => void;
  useResetStateWillUnmount: () => void;
}

export function createModel<S extends Record<string, any>>(defaultState: S) {
  const stateAtom = atom<S>(defaultState);

  function useModel(): Model<S> {
    const uniqueObject = React.useMemo(() => ({}), []);
    const [state, updateState] = useAtom(stateAtom);

    /** 更新状态 */
    const setState: Model<S>["setState"] = newState => {
      updateState(preState => {
        return newState instanceof Function
          ? produce(preState, newState)
          : produce(preState, draft => {
              Object.assign(draft, newState);
            });
      });
    };

    /** 使用默认值重置状态 */
    const resetState: Model<S>["resetState"] = () => updateState(defaultState);

    /** 组件卸载，清空状态 */
    const useResetStateWillUnmount = () => {
      React.useEffect(() => {
        () => {
          resetState();
        };
      }, []);
    };

    return Object.assign(uniqueObject, { state, defaultState, setState, resetState, useResetStateWillUnmount });
  }

  /** 服务端初始化状态，只能用 hooks 用法调用 */
  const useHydrateState = (initialState: S) => {
    useHydrateAtoms([[stateAtom, initialState]]);
  };

  return { useModel, atom: stateAtom, useHydrateState };
}
