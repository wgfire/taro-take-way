import React from "react";
import { NutToast } from "@src/lib/components/basic/Toast";
import { ScrollView, View } from "@tarojs/components";
import type { CommonEventFunction } from "@tarojs/components";
import type { ScrollViewProps } from "@tarojs/components/types/ScrollView";
import { useSetState } from "../../../hooks/useSetState";
import { useBoundingClientRect } from "../../../hooks/useBoundingClientRect";
import { StringUtil } from "../../../utils/StringUtil";
import { Flex } from "../../basic/Flex";
import { Text } from "../../basic/Text";

export interface LoadMore {
  pageNum: number;
  pageSize: number;
  total: number;
  /** 是否允许加载更多开关，方便首次控制不显示loadMore文本 */
  enable?: boolean;
  /** 滚动到底部，且条件符合，那么调用该函数 */
  onLoadMore: () => void | Promise<any>;
}

export interface ScrollContentProps extends ScrollViewProps {
  /** 滚动到底部加载更多 */
  loadMore?: LoadMore;
  style?: React.CSSProperties;
}

interface State {
  height: number;
  id: string;
  isLoadingMore: boolean;
}

/**
 * 页面滚动容器，只在需要上拉加载的情况下使用，其他情况只需要使用 PageView.Content 即可
 * @description 有一种情况不适用，PageFooter 动态显示隐藏的情况，ScrollContent 高度无法动态实时计算，造成页面滚动异常
 */
export const ScrollContent: React.FC<ScrollContentProps> = React.memo(props => {
  const { loadMore, style, children, onScrollToLower, ...restProps } = props;
  const enableLoadMore = loadMore && (loadMore.enable ?? true);
  const [state, setState] = useSetState<State>(() => {
    return { height: 0, id: StringUtil.uniqueId(), isLoadingMore: false };
  });

  useBoundingClientRect(`#${state.id}`, rects => rects[0] && setState({ height: rects[0].height }));

  const shouldLoadMore = (pagination: LoadMore) => pagination.pageNum * pagination.pageSize < pagination.total;

  const handleOnScrollToLower: CommonEventFunction = event => {
    if (!state.isLoadingMore && loadMore && shouldLoadMore(loadMore)) {
      const result = loadMore.onLoadMore();

      // TODO: refactor
      // onLoadMore 返回 promise，则等待，避免滚动触发多次
      if (result && result.then) {
        setState({ isLoadingMore: true });

        result
          .then(() => {
            setState({ isLoadingMore: false });
          })
          .catch(() => {
            setState({ isLoadingMore: false });
          });
      }
    }
    onScrollToLower?.(event);
  };

  return (
    <Flex flexGrow={1} id={state.id}>
      <ScrollView {...restProps} style={{ ...style, height: state.height }} onScrollToLower={handleOnScrollToLower} enhanced showScrollbar={false}>
        {children}
        {loadMore && enableLoadMore && (shouldLoadMore(loadMore) ? <NutToast state={{ type: "loading" }} /> : <Text size="24rpx" color="lightGray#999999"></Text>)}
      </ScrollView>
    </Flex>
  );
});

ScrollContent.defaultProps = {
  scrollX: false,
  scrollY: true,
  scrollWithAnimation: true,
  enableBackToTop: true,
};
