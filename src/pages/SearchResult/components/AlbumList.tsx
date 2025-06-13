import { useInfiniteQuery } from "@tanstack/react-query";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import StatusMessage from "../../../components/StatusMessage";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import CommonList from "./CommonList";

function AlbumList({ query, type }: { query: string; type: string }) {
  const {
    data,
    isLoading: isItemsLoading,
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
    isItemsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  console.log("AlbumList");

  if (isItemsLoading || isError) {
    return <StatusMessage isLoading={isItemsLoading} isError={isError} />;
  }

  return <CommonList items={items} lastItemRef={lastItemRef} />;
}

export default AlbumList;
