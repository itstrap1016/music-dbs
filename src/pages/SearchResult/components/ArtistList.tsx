import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import StatusMessage from "../../../components/StatusMessage";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import CommonList from "./CommonList";
import { fetchArtistImages } from "../../../api/googleApi";

function ArtistList({ query, type }: { query: string; type: string }) {
  const {
    data,
    isLoading: isItemsLoading,
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

  const items = (data?.pages.flat() as SearchIF[]) ?? [];

  // React Query로 이미지 검색 API 호출
  const { data: customImage = {}, isLoading: isImageLoading } = useQuery({
    queryKey: ["artistImages", query, type],
    queryFn: async () => {
      const data = await searchPreview(query, type);
      const artistName = data[0].name;
      return fetchArtistImages(artistName);
    },
    enabled: !!query && !!type,
    // enabled: artistNames.length > 0,
    staleTime: 1000 * 60 * 10,
  });

  const lastItemRef = useInfiniteScroll({
    isItemsLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isItemsLoading || isImageLoading) {
    return <StatusMessage isLoading={true} isError={false} />;
  }
  if (isError) {
    return <StatusMessage isLoading={false} isError={true} />;
  }

  return (
    <CommonList
      items={items}
      lastItemRef={lastItemRef}
      customImage={customImage}
    />
  );
}

export default ArtistList;
