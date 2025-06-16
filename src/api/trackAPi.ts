const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://ws.audioscrobbler.com/2.0/";

// 트랙 상세 정보 조회
export async function getTrackInfo(artist: string, track: string) {
  const url = `${API_URL}?method=track.getInfo&artist=${encodeURIComponent(
    artist
  )}&track=${encodeURIComponent(track)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch track info");
    const data = await response.json();
    return data.track || null;
  } catch (error) {
    console.error("Error fetching track info from Last.fm:", error);
    return null;
  }
}

// 비슷한 트랙 조회
export async function getTrackSimilar(artist: string, track: string) {
  const url = `${API_URL}?method=track.getSimilar&artist=${encodeURIComponent(
    artist
  )}&track=${encodeURIComponent(track)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch similar tracks");
    const data = await response.json();
    return data.similartracks?.track || [];
  } catch (error) {
    console.error("Error fetching similar tracks from Last.fm:", error);
    return [];
  }
}

// 트랙 태그 조회
export async function getTrackTags(artist: string, track: string) {
  const url = `${API_URL}?method=track.getTags&artist=${encodeURIComponent(
    artist
  )}&track=${encodeURIComponent(track)}&api_key=${API_KEY}&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch track tags");
    const data = await response.json();
    return data.tags?.tag || [];
  } catch (error) {
    console.error("Error fetching track tags from Last.fm:", error);
    return [];
  }
}
