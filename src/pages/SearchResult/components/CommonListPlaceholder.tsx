import ContentLoader from "react-content-loader";

function CommonListPlaceholder() {
  return (
    <ul className="max-w-[814px] mx-auto mt-14 pb-14 grid grid-cols-4 gap-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <li
          key={i}
          className="aspect-square overflow-hidden bg-gray-200 rounded-lg flex flex-col justify-end relative"
        >
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            backgroundColor="#e5e7eb" // Tailwind bg-zinc-400
            foregroundColor="#f3f4f6" // Tailwind bg-zinc-300
            style={{ width: "100%", height: "100%" }}
          >
            {/* 앨범 이미지 영역 */}
            <rect x="0" y="0" rx="0" ry="0" width="200" height="200" />
          </ContentLoader>
        </li>
      ))}
    </ul>
  );
}

export default CommonListPlaceholder;
