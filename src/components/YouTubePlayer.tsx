import { useImperativeHandle, forwardRef, useState } from "react";

export type YouTubePlayerHandle = {
  show: (videoSrc: string) => void;
  hide: () => void;
};

function addParamsToUrl(url: string, params: Record<string, string>) {
  const u = new URL(url, "https://www.youtube.com");
  Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}

const YouTubePlayer = forwardRef<YouTubePlayerHandle, object>((props, ref) => {
  const [src, setSrc] = useState("");
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (videoSrc: string) => {
      // autoplay, enablejsapi, mute(모바일 대응)
      const url = addParamsToUrl(videoSrc, {
        autoplay: "1",
      });
      setSrc(url);
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
      setTimeout(() => setSrc(""), 500); // transition 후 src 비움
    },
  }));

  return (
    <div
      className={`fixed bottom-8 left-8 transition-transform duration-500 ${
        visible ? "translate-y-0" : "translate-y-[150%]"
      }`}
    >
      <button
        className={`absolute -top-10 right-0 bg-[rgba(0,0,0,0.5)] rounded-[4px] ${
          visible ? "inline-block" : "hidden"
        }`}
        onClick={() =>
          ref &&
          typeof ref !== "function" &&
          ref.current?.hide &&
          ref.current.hide()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      {src && (
        <iframe
          width="350"
          height="200"
          src={src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
});

export default YouTubePlayer;
