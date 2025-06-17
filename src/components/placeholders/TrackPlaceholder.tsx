import ContentLoader from "react-content-loader";

function TrackPlaceholder() {
  return (
    <ul className="max-w-[814px] mx-auto mt-14 pb-14">
      {Array.from({ length: 10 }).map((_, i) => (
        <li
          key={i}
          className="h-12 border-b-[1px] border-gray-200 dark:border-zinc-700 flex items-center px-3.5"
        >
          <ContentLoader
            speed={2}
            width="100%"
            height={48}
            viewBox="0 0 814 48"
            backgroundColor="#e5e7eb" // Tailwind bg-zinc-400
            foregroundColor="#f3f4f6" // Tailwind bg-zinc-300
            style={{ width: "100%", height: "48px" }}
          >
            {/* 플레이 버튼 영역 */}
            <rect x="0" y="8" rx="8" ry="8" width="32" height="32" />
            {/* 트랙명 영역 */}
            <rect x="48" y="14" rx="4" ry="4" width="90%" height="16" />
          </ContentLoader>
        </li>
      ))}
    </ul>
  );
}

export default TrackPlaceholder;
