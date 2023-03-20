import produce from "immer";
import { Model } from "@src/utils/mvp";
import React from "react";
import { StringUtil } from "@src/lib/utils/StringUtil";

export function useChunkStateUtil<CS extends PlainObject<any>>(model: Model<Record<string, CS>>, defaultChunkState: CS) {
  const chunkId = React.useMemo(() => StringUtil.uniqueId(), []);

  const chunkState = model.state[chunkId] || defaultChunkState;

  const setChunkState = <K extends keyof CS>(optionalChunkState: Pick<CS, K> | ((draft: CS) => void)) => {
    model.setState(state => {
      const prevChunkState = { ...defaultChunkState, ...state[chunkId] };
      const newChunkState =
        optionalChunkState instanceof Function
          ? produce(prevChunkState, optionalChunkState)
          : produce(prevChunkState, draft => {
              Object.assign(draft, optionalChunkState);
            });
      state[chunkId] = newChunkState;
    });
  };

  const resetChunkState = () => {
    model.setState(state => {
      state[chunkId] = defaultChunkState;
    });
  };

  return { chunkState, setChunkState, resetChunkState };
}
