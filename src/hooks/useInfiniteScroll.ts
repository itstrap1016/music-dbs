import { useRef, useCallback } from "react";

type UseInfiniteScrollProps = {
  isItemsLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
};

export function useInfiniteScroll({
  isItemsLoading,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
}: UseInfiniteScrollProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastItemRef = useCallback(
    (node: HTMLElement | null) => {
      if (isItemsLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isItemsLoading, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  return lastItemRef;
}
