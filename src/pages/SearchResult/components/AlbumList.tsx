import { useInfiniteQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import ContentLoader from "react-content-loader";
import StatusItem from "./StatusItem";
import type { SearchIF } from "../../../types/searchTypes";
import { searchPreview } from "../../../api/searchApi";
import ErrorMessage from "../../../components/ErrorMessage";
import { useInfiniteScroll } from "../../../hooks/useInfiniteScroll";

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
    return (
      <ul className="max-w-[814px] mx-auto mt-14 pb-14 grid grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <li
            key={i}
            className="aspect-square overflow-hidden bg-gray-200 rounded-lg flex flex-col justify-end relative"
          >
            <ContentLoader
              speed={2}
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              backgroundColor="#a1a1aa" // Tailwind bg-zinc-400
              foregroundColor="#d4d4d8" // Tailwind bg-zinc-300
              style={{ width: "100%", height: "100%" }}
            >
              {/* 앨범 이미지 영역 */}
              <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
            </ContentLoader>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="max-w-[814px] mx-auto mt-14 pb-14 grid grid-cols-4 gap-1">
      {items.length > 0 ? (
        items.map((item, index) => (
          <li
            className="aspect-square overflow-hidden"
            key={index}
            ref={index === items.length - 1 ? lastItemRef : undefined}
          >
            <Link
              to=""
              className="w-full h-full relative overflow-hidden group"
            >
              {item.image[2]["#text"] ? (
                <img
                  src={item.image[2]["#text"]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-zinc-500 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-2 z-10">
                <p className="text-white font-medium drop-shadow mb-2 group-hover:underline text-sm h-10 overflow-hidden text-ellipsis whitespace-normal line-clamp-2 leading-normal">
                  {item.name.length > 30 ? item.name.slice(0, 30) : item.name}
                </p>
                <p className="text-white text-sm drop-shadow truncate">
                  {item.artist
                    ? item.artist.length > 30
                      ? `${item.artist.slice(0, 30)}...`
                      : item.artist
                    : null}
                </p>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <StatusItem text="검색 결과가 없습니다.🔍" />
      )}
    </ul>
  );
}

export default AlbumList;
