// src/hooks/useYoutubePlayer.ts
import { useRef } from "react";
import { searchYoutubeVideo } from "../api/youtubeApi";
import type { YouTubePlayerHandle } from "../components/YouTubePlayer";

export function useYoutubePlayer() {
  const playerRef = useRef<YouTubePlayerHandle>(null);

  const handlePlayClick = async (artist: string, name: string) => {
    try {
      const videoSrc = await searchYoutubeVideo(`${artist} ${name}`);
      if (videoSrc) {
        playerRef.current?.show(videoSrc);
      } else {
        alert("YouTube 영상을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("유튜브 재생 중 오류 발생:", error);
      alert("영상 재생 중 오류가 발생했습니다.");
    }
  };

  return { playerRef, handlePlayClick };
}
