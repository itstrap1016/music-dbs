import { useSearchParams } from "react-router-dom";
import TrackList from "./TrackList";
import AlbumList from "./AlbumList";

function ResultList() {
  const [searhParams] = useSearchParams();
  const query = searhParams.get("query") || "";
  const type = searhParams.get("type") || "";

  return (
    <>
      {type === "track" && <TrackList query={query} type={type} />}
      {type === "album" && <AlbumList query={query} type={type} />}
      {type === "artist" && <AlbumList query={query} type={type} />}
    </>
  );
}

export default ResultList;
