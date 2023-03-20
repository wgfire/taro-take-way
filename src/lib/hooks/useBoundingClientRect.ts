import { createSelectorQuery, NodesRef } from "@tarojs/taro";
import { useDidMount } from "./lifecycle";
import { usePersist } from "./usePersist";

/**
 * 获取页面元素的尺寸位置信息
 * @see https://taro-docs.jd.com/taro/docs/react-page#onready-
 * @description
 * - useBoundingClientRect 传入参数，那么参数 callback 将在组件渲染完成后获取 dom 的位置、大小相关信息，支持按需加载动态组件, 获取时机在 nextTick 中
 * - useBoundingClientRect 返回一个函数，该函数可以根据任意的选择器，获取 dom 的位置、大小相关信息，获取时机在 nextTick 中
 */
export function useBoundingClientRect(selector?: string, callback?: (rects: NodesRef.BoundingClientRectCallbackResult[]) => void) {
  const getBoundingClientRect = usePersist((whicheverSelector: string) => {
    return new Promise<NodesRef.BoundingClientRectCallbackResult[]>(resolve => {
    //   nextTick(() => createSelectorQuery().select(whicheverSelector).boundingClientRect().exec(resolve));
      setTimeout(() => createSelectorQuery().select(whicheverSelector).boundingClientRect().exec(resolve));
    });
  });

  useDidMount(() => {
    if (selector && callback) {
      getBoundingClientRect(selector).then(callback);
    }
  });

  return { getBoundingClientRect };
}
