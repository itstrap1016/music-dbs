import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../components/SearchInput/Index";
import { getTrackInfo, getTrackSimilar, getTrackTags } from "../api/trackAPi";

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

  const { data: trackTags, isLoading: tagsLoading } = useQuery({
    queryKey: ["trackTags", artist, track],
    queryFn: () => getTrackTags(artist, track),
    enabled: !!artist && !!track,
  });

  console.log(
    "trackInfo:",
    trackInfo,
    "similiarTracks:",
    similarTracks,
    "trackTags:",
    trackTags
  );
  console.log(infoLoading, similarLoading, tagsLoading);

  return (
    <>
      <SearchInput />
      <>detail...</>
    </>
  );
}

export default TrackDetail;
