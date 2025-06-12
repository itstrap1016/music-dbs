import { useInfiniteQuery } from "@tanstack/react-query";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import StatusMessage from "../../../components/StatusMessage";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import CommonList from "./CommonList";

function ArtistList({ query, type }: { query: string; type: string }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchIF[], Error>({
    queryKey: ["searchArtist", query, type],
    queryFn: ({ pageParam = 1 }) =>
      searchPreview(query, type, pageParam as number),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 100 ? allPages.length + 1 : undefined,
    enabled: !!query && !!type,
    staleTime: 1000 * 60,
    initialPageParam: 1,
  });

  const lastItemRef = useInfiniteScroll({
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading || isError) {
    return <StatusMessage isLoading={isLoading} isError={isError} />;
  }

  const items = (data?.pages.flat() as SearchIF[]) ?? [];

  return <CommonList items={items} lastItemRef={lastItemRef} />;
}

export default ArtistList;
