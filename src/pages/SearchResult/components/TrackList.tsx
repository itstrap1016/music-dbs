import { useInfiniteQuery } from "@tanstack/react-query";
import TrackPlaceholder from "../../../components/placeholders/TrackPlaceholder";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import ErrorMessage from "../../../components/ErrorMessage";
import StatusItem from "./StatusItem";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import YouTubePlayer from "../../../components/YouTubePlayer";
import PlayListItem from "../../../components/PlayListItem";
import { useYoutubePlayer } from "../../../hooks/useYoutubePlayer";

function TrackList({ query, type }: { query: string; type: string }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<SearchIF[], Error>({
    queryKey: ["searchTrack", query, type],
    queryFn: ({ pageParam = 1 }) =>
      searchPreview(query, type, pageParam as number),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 100 ? allPages.length + 1 : undefined,
    enabled: !!query && !!type,
    staleTime: 1000 * 60,
    initialPageParam: 1,
  });

  // Intersection Observer로 마지막 요소 감지
  const lastItemRef = useInfiniteScroll({
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });
  const { playerRef, handlePlayClick } = useYoutubePlayer();

  if (isLoading) {
    return <TrackPlaceholder />;
  }
  if (isError) {
    return <ErrorMessage />;
  }

  // 모든 페이지 데이터 합치기
  const items = (data?.pages.flat() as SearchIF[]) ?? [];

  console.log(items);

  return (
    <>
      <ul className="max-w-[814px] mx-auto mt-14 pb-14">
        {items.length > 0 ? (
          items.map((item, index) => (
            <PlayListItem
              artist={item.artist}
              name={item.name}
              index={index}
              length={items.length}
              lastItemRef={lastItemRef}
              handlePlayClick={handlePlayClick}
            />
          ))
        ) : (
          <li>
            <StatusItem text="검색 결과가 없습니다.🔍" />
          </li>
        )}
        {isFetchingNextPage && <StatusItem text="데이터 로딩중...⏳" />}
      </ul>
      <YouTubePlayer ref={playerRef} />
    </>
  );
}

export default TrackList;
