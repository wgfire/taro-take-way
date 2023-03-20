import { createIntersectionObserver, getCurrentInstance, nextTick } from "@tarojs/taro";
import { useDidMount } from "./lifecycle";
import type { IntersectionObserver } from "@tarojs/taro";

type Option = NonNullable<Parameters<typeof createIntersectionObserver>[1]>;

export interface UseIntersectionObserverOption extends Option {
  observeAll?: boolean;
  /** 当 selector 可选取多个元素的时候， observerAll 需要为 true */
  targetSelector: string;
  /**
   * 参考元素
   * @description
   * - 不传值，或者传 [null, {}], 则默认参考 viewport
   * - 传值，如：['#id', {}], 则相对于元素 '#id'
   */
  relativeTo?: Parameters<IntersectionObserver["relativeTo"]> | [selector: null, margin: IntersectionObserver.RelativeToViewportMargins];
  callback: IntersectionObserver.ObserveCallback;
}

export const useIntersectionObserver = (options: UseIntersectionObserverOption) => {
  const { targetSelector, callback, ...rest } = options;
  useDidMount(() => {
    nextTick(() => {
      const ob = createIntersectionObserver(getCurrentInstance().page!, rest);
      if (options.relativeTo && options.relativeTo[0]) {
        ob.relativeTo(...options.relativeTo);
      } else {
        ob.relativeToViewport(options.relativeTo?.[1]);
      }
      ob.observe(targetSelector, callback);
    });
  });
};
