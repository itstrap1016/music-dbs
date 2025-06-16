const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://ws.audioscrobbler.com/2.0/";

// Top Artists
export async function getTopArtists(page: number = 1, limit: number = 10) {
  const url = `${API_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=${limit}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch top artists");
    const data = await response.json();
    // data.artists.artist 배열 반환
    return data.artists?.artist || [];
  } catch (error) {
    console.error("Error fetching top artists from Last.fm:", error);
    return [];
  }
}

// Top Tracks
export async function getTopTracks(page: number = 1, limit: number = 10) {
  const url = `${API_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=${limit}&page=${page}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch top tracks");
    const data = await response.json();
    // data.tracks.track 배열 반환
    return data.tracks?.track || [];
  } catch (error) {
    console.error("Error fetching top tracks from Last.fm:", error);
    return [];
  }
}
