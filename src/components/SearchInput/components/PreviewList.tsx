import { Link } from "react-router-dom";
import type { SearchIF } from "../../../types/searchTypes";

function PreviewList({
  preview,
  searchType,
}: {
  preview: SearchIF[];
  searchType: string;
}) {
  return (
    <div className="absolute top-14 left-0 border-gray-300 border-[1px] border-t-0 w-full rounded-b-2xl bg-white z-50 dark:border-zinc-600 dark:bg-zinc-800">
      <div className="h-[1px] border-gray-200 border-t w-[560px] mx-auto dark:border-zinc-700"></div>
      <ul
        className={`pt-4 max-h-[600px] ${
          preview.length >= 6 ? "overflow-y-scroll" : "overflow-y-hidden"
        }`}
      >
        {preview.map((item, idx) => (
          <li className="" key={idx}>
            <Link
              to=""
              className="pl-5 flex items-center gap-5 pb-2 pt-2 hover:bg-gray-100 dark:hover:bg-zinc-900"
            >
              {searchType === "album" &&
                (item["image"][2]["#text"] ? (
                  <div className="w-22 h-22">
                    <img src={item.image[2]["#text"]} alt={`${item["name"]}`} />
                  </div>
                ) : (
                  <div className="w-22 h-22 bg-gray-200 dark:bg-zinc-500"></div>
                ))}
              <div
                className={`flex-1 ${
                  searchType !== "album" && "flex items-center gap-4"
                }`}
              >
                <p
                  className={`dark:text-white ${
                    searchType === "album" && "mb-2"
                  }`}
                >
                  {item["name"]
                    ? item["name"].length > 40
                      ? item["name"].slice(0, 40) + "…"
                      : item["name"]
                    : ""}
                </p>
                <p className="text-sm text-gray-400">
                  {item["artist"]
                    ? item["artist"].length > 40
                      ? item["artist"].slice(0, 40) + "…"
                      : item["artist"]
                    : ""}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PreviewList;
