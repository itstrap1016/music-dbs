const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export async function searchYoutubeVideo(query: string) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("YouTube API 요청 실패");
    const data = await res.json();
    if (data.items && data.items.length > 0) {
      return `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
    }
    // 검색 결과가 없을 때도 예외로 처리
    throw new Error("검색 결과 없음");
  } catch {
    return null;
  }
}
