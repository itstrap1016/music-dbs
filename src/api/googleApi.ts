const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CX = import.meta.env.VITE_CX;

// Google Custom Search API로 상위 8개 아티스트 이미지 가져오기
export async function fetchArtistImages(artistName: string) {
  try {
    const res = await fetch(
      `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        artistName
      )}&searchType=image&num=1&key=${API_KEY}&cx=${CX}`
    );
    const data = await res.json();
    const imageUrl = data.items?.[0]?.link;
    return imageUrl;
  } catch {
    // 에러 무시
  }
}
