import { useSearchParams } from "react-router-dom";
import TrackList from "./components/TrackList";
import AlbumList from "./components/AlbumList";
import SearchInput from "../../components/SearchInput/Index";
import ArtistList from "./components/ArtistList";

function SearchResult() {
  const [searhParams] = useSearchParams();
  const query = searhParams.get("query") || "";
  const type = searhParams.get("type") || "";

  return (
    <>
      <SearchInput />
      <>
        {type === "track" && <TrackList query={query} type={type} />}
        {type === "album" && <AlbumList query={query} type={type} />}
        {type === "artist" && <ArtistList query={query} type={type} />}
      </>
    </>
  );
}

export default SearchResult;
