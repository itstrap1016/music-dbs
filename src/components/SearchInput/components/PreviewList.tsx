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
    <div className="absolute top-14 left-0 border-gray-300 border-[1px] border-t-0 w-full rounded-b-2xl bg-white z-50 dark:border-zinc-600 dark:bg-zinc-800 overflow-hidden">
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
                  <div className="w-22 h-22 bg-gray-200 dark:bg-zinc-500 flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4 text-gray-400"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                      />
                    </svg>
                  </div>
                ))}
              <div
                className={`flex-1 ${
                  searchType !== "album" &&
                  "flex items-center gap-4 justify-between pr-4"
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
