import { useInfiniteQuery } from "@tanstack/react-query";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import ErrorMessage from "../../../components/ErrorMessage";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import CommonListPlaceholder from "./placeholders/CommonListPlaceholder";
import CommonList from "./CommonList";

function AlbumList({ query, type }: { query: string; type: string }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchIF[], Error>({
    queryKey: ["searchAlbum", query, type],
    queryFn: ({ pageParam = 1 }) =>
      searchPreview(query, type, pageParam as number),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 100 ? allPages.length + 1 : undefined,
    enabled: !!query && !!type,
    staleTime: 1000 * 60,
    initialPageParam: 1,
  });

  const items = (data?.pages.flat() as SearchIF[]) ?? [];

  const lastItemRef = useInfiniteScroll({
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isError) {
    return <ErrorMessage />;
  }

  if (isLoading) {
    // 8개 플레이스홀더 예시
    return <CommonListPlaceholder />;
  }

  return <CommonList items={items} lastItemRef={lastItemRef} />;
}

export default AlbumList;
