import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchPreview } from "../../../api/api";
import type { SearchIF } from "../../../types/searchTypes";

function ResultList() {
  const [searhParams] = useSearchParams();
  const query = searhParams.get("query") || "";
  const type = searhParams.get("type") || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["search", query, type],
    queryFn: () => searchPreview(query, type),
    enabled: !!query, // query가 있을 때만 fetch
  });

  if (!query) return <div>검색어를 입력하세요.</div>;
  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러가 발생했습니다</div>;

  console.log(data);

  return (
    <ul>
      {data?.map((item: SearchIF, idx: number) => (
        <li key={idx}>{item.name}</li>
      ))}
    </ul>
  );
}

export default ResultList;
