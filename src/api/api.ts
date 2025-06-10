const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://ws.audioscrobbler.com/2.0/";

export async function searchPreview(query: string, searchType: string) {
  if (!query.trim()) return [];

  let method = "";
  let resultKey = "";

  switch (searchType) {
    case "track":
      method = "track.search";
      resultKey = "trackmatches";
      break;
    case "album":
      method = "album.search";
      resultKey = "albummatches";
      break;
    case "artist":
      method = "artist.search";
      resultKey = "artistmatches";
      break;
    default:
      return [];
  }

  const url = `${API_URL}?method=${method}&${searchType}=${encodeURIComponent(
    query
  )}&api_key=${API_KEY}&format=json&limit=500`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    // return data;
    return data.results?.[resultKey]?.[searchType] || [];
  } catch (error) {
    console.error("Error fetching from Last.fm:", error);
    return [];
  }
}
