import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../components/SearchInput/Index";
import { getTrackInfo, getTrackSimilar } from "../api/trackAPi";
import PlayListItem from "../components/PlayListItem";
import { useYoutubePlayer } from "../hooks/useYoutubePlayer";
import YouTubePlayer from "../components/YouTubePlayer";

interface SimilarTrackInterface {
  artist: {
    name: string;
  };
  name: string;
  // 추가적인 last.fm API에서 제공하는 필드들
  match?: number; // 유사도 점수
  url?: string; // 트랙 URL
  streamable?: boolean; // 스트리밍 가능 여부
  duration?: number; // 재생 시간
  image?: {
    // 이미지 배열 (여러 사이즈)
    "#text": string;
    size: string;
  }[];
}

function TrackDetail() {
  const { artist = "", track = "" } = useParams();

  const { data: trackInfo, isLoading: infoLoading } = useQuery({
    queryKey: ["trackInfo", artist, track],
    queryFn: () => getTrackInfo(artist, track),
    enabled: !!artist && !!track,
  });

  const { data: similarTracks, isLoading: similarLoading } = useQuery({
    queryKey: ["trackSimilar", artist, track],
    queryFn: () => getTrackSimilar(artist, track),
    enabled: !!artist && !!track,
  });

  const { playerRef, handlePlayClick } = useYoutubePlayer();

  console.log(infoLoading, similarLoading);

  return (
    <>
      <SearchInput />
      <section className="max-w-[814px] mx-auto mt-14">
        <h2 className="sr-only">트랙 상세</h2>
        <div className="flex gap-12">
          <div className="relative aspect-square rounded-3xl basis-[250px] max-h-[250px] flex-shrink-0">
            <button
              className="absolute top-2 right-2"
              onClick={() =>
                handlePlayClick(trackInfo?.artist?.name, trackInfo?.name)
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10 text-green-500 dark:text-violet-500"
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
            {trackInfo?.album?.image[3] ? (
              <img
                className="block w-full h-full rounded-3xl"
                src={trackInfo?.album?.image[3]["#text"]}
                alt={trackInfo?.name}
              ></img>
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-zinc-500 flex justify-center items-center rounded-3xl">
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
          </div>
          <div>
            <h3 className="text-2xl font-medium dark:text-white">
              {trackInfo?.name && trackInfo?.name}
            </h3>
            <h4 className="text-lg text-gray-400 mt-2 dark:text-zinc-400">
              {trackInfo?.artist?.name && trackInfo?.artist?.name}
            </h4>
            {trackInfo?.toptags?.tag?.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {trackInfo?.toptags?.tag
                  ?.slice(0, 5)
                  .map((item: { name: string; url: string }, index: number) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        target="_blank"
                        className="text-green-500 text-sm hover:underline dark:text-violet-500"
                      >
                        #{item.name}
                      </a>
                    </li>
                  ))}
              </ul>
            )}
            <p className="mt-4 max-h-[130px] overflow-hidden text-ellipsis whitespace-pre-line line-clamp-5 dark:text-zinc-400">
              {trackInfo?.wiki?.summary && trackInfo?.wiki?.summary}
            </p>
          </div>
        </div>
        {similarTracks?.length > 0 && (
          <div className="mt-14 pb-14">
            <h3 className="text-2xl font-medium dark:text-white mb-4">
              Similiar Tracks
            </h3>
            <ul>
              {similarTracks?.map(
                (item: SimilarTrackInterface, index: number) => (
                  <PlayListItem
                    artist={item.artist.name}
                    name={item.name}
                    index={index}
                    length={similarTracks?.length}
                    handlePlayClick={handlePlayClick}
                  />
                )
              )}
            </ul>
          </div>
        )}
      </section>
      <YouTubePlayer ref={playerRef} />
    </>
  );
}

export default TrackDetail;
