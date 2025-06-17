import { useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import TrackPlaceholder from "./placeholders/TrackPlaceholder";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import ErrorMessage from "../../../components/ErrorMessage";
import StatusItem from "./StatusItem";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";
import { searchYoutubeVideo } from "../../../api/youtubeApi";
import YouTubePlayer from "../../../components/YouTubePlayer";
import type { YouTubePlayerHandle } from "../../../components/YouTubePlayer";

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
  const playerRef = useRef<YouTubePlayerHandle | null>(null);

  const handlePlayClick = async (artist: string, name: string) => {
    const videoSrc = await searchYoutubeVideo(`${artist} ${name}`);
    if (videoSrc) {
      playerRef.current?.show(videoSrc);
    } else {
      alert("YouTube 영상을 찾을 수 없습니다.");
    }
  };

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
          items.map((item, idx) => (
            <li
              key={idx}
              ref={idx === items.length - 1 ? lastItemRef : undefined}
              className="h-12 border-b-[1px] border-gray-200 dark:border-zinc-700 flex items-center hover:bg-gray-100 dark:hover:bg-zinc-900 group px-3.5"
            >
              <button
                className="w-8 h-8 mr-2"
                onClick={() => handlePlayClick(item.artist ?? "", item.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 w-8 h-8 text-green-500 dark:text-violet-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              </button>
              <Link
                to={`/track/${encodeURIComponent(
                  item.artist ?? ""
                )}/${encodeURIComponent(item.name)}`}
                className="w-full h-full flex items-center justify-between"
              >
                <p className="font-medium dark:text-white group-hover:underline">
                  {item.name.length > 60
                    ? `${item.name.slice(0, 60)}...`
                    : item.name}
                </p>
                <p className="text-gray-400 text-sm dark:text-zinc-400">
                  {(item.artist ?? "").length > 20
                    ? `${(item.artist ?? "").slice(0, 20)}...`
                    : item.artist ?? ""}
                </p>
              </Link>
            </li>
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
