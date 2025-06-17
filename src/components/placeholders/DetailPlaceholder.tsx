import ContentLoader from "react-content-loader";

function DetailPlaceholder() {
  return (
    <section className="max-w-[814px] mx-auto mt-14">
      <div className="flex gap-12">
        {/* 앨범아트 플레이스홀더 */}
        <div className="basis-[250px] flex-shrink-0">
          <ContentLoader
            speed={2}
            width={250}
            height={250}
            viewBox="0 0 250 250"
            backgroundColor="#e5e7eb"
            foregroundColor="#f3f4f6"
          >
            <rect x="0" y="0" rx="24" ry="24" width="250" height="250" />
          </ContentLoader>
        </div>

        {/* 트랙 정보 플레이스홀더 */}
        <div className="flex-1">
          <ContentLoader
            speed={2}
            width="100%"
            height={200}
            viewBox="0 0 500 200"
            backgroundColor="#e5e7eb"
            foregroundColor="#f3f4f6"
          >
            {/* 트랙명 */}
            <rect x="0" y="0" rx="4" ry="4" width="280" height="24" />

            {/* 아티스트명 */}
            <rect x="0" y="40" rx="4" ry="4" width="180" height="18" />

            {/* 태그들 */}
            <rect x="0" y="80" rx="4" ry="4" width="60" height="16" />
            <rect x="70" y="80" rx="4" ry="4" width="60" height="16" />
            <rect x="140" y="80" rx="4" ry="4" width="60" height="16" />
            <rect x="210" y="80" rx="4" ry="4" width="60" height="16" />

            {/* 설명 텍스트 */}
            <rect x="0" y="120" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="140" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="160" rx="4" ry="4" width="100%" height="12" />
            <rect x="0" y="180" rx="4" ry="4" width="80%" height="12" />
          </ContentLoader>
        </div>
      </div>
    </section>
  );
}

export default DetailPlaceholder;
