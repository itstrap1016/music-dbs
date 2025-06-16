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
          <div className="aspect-square rounded-3xl bg-gray-200 basis-[250px] flex-shrink-0"></div>
          <div>
            <h3 className="text-2xl font-medium">Agora Hills</h3>
            <h4 className="text-lg text-gray-400 mt-2">Doja Cat</h4>
            <ul className="mt-4 flex gap-4">
              <li>
                <a href="" target="_blank" className="text-green-500 text-sm">
                  #hiphop
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="text-green-500 text-sm">
                  #hiphop
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="text-green-500 text-sm">
                  #hiphop
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="text-green-500 text-sm">
                  #hiphop
                </a>
              </li>
              <li>
                <a href="" target="_blank" className="text-green-500 text-sm">
                  #hiphop
                </a>
              </li>
            </ul>
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
              nulla tenetur quis, maxime ex magnam ullam beatae unde accusantium
              voluptatibus autem nam ducimus, asperiores minima. Libero facilis
              deserunt enim esse?
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default TrackDetail;
