import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../components/SearchInput/Index";
import { getTrackInfo, getTrackSimilar } from "../api/trackAPi";

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

  console.log("trackInfo:", trackInfo, "similiarTracks:", similarTracks);
  console.log(infoLoading, similarLoading);

  return (
    <>
      <SearchInput />
      <section className="max-w-[814px] mx-auto mt-14">
        <h2 className="sr-only">트랙 상세</h2>
        <div className="flex gap-12">
          <div className="relative aspect-square rounded-3xl basis-[250px] flex-shrink-0">
            <button className="absolute top-2 right-2">
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
            ) : null}
          </div>
          <div>
            <h3 className="text-2xl font-medium dark:text-white">
              {trackInfo?.name && trackInfo?.name}
            </h3>
            <h4 className="text-lg text-gray-400 mt-2 dark:text-zinc-400">
              {trackInfo?.artist?.name && trackInfo?.artist?.name}
            </h4>
            <ul className="mt-4 flex gap-4">
              {trackInfo?.toptags?.tag?.length > 0 &&
                trackInfo?.toptags?.tag
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
              <li>
                <a
                  href=""
                  target="_blank"
                  className="text-green-500 text-sm hover:underline"
                ></a>
              </li>
            </ul>
            <p className="mt-4 max-h-[126px] overflow-hidden text-ellipsis whitespace-pre-line line-clamp-5 dark:text-zinc-400">
              {trackInfo?.wiki?.summary && trackInfo?.wiki?.summary}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrackDetail;
