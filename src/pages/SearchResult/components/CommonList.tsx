import { Link } from "react-router-dom";
import StatusItem from "./StatusItem";
import type { SearchIF } from "../../../types/searchTypes";

function CommonList({
  items,
  lastItemRef,
}: {
  items: SearchIF[];
  lastItemRef: React.Ref<HTMLLIElement>;
}) {
  return (
    <ul className="max-w-[814px] mx-auto mt-14 pb-14 grid grid-cols-4 gap-1">
      {items.length > 0 ? (
        items.map((item, index) => (
          <li
            className="aspect-square overflow-hidden rounded-2xl"
            key={index}
            ref={index === items.length - 1 ? lastItemRef : undefined}
          >
            <Link
              to=""
              className="w-full h-full relative overflow-hidden group"
            >
              {item.image[2]["#text"] ? (
                <img
                  src={item.image[2]["#text"]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-zinc-500 flex justify-center items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-8 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-2 z-10">
                <p className="text-white font-medium drop-shadow mb-2 group-hover:underline text-sm h-10 overflow-hidden text-ellipsis whitespace-normal line-clamp-2 leading-normal">
                  {item.name.length > 30 ? item.name.slice(0, 30) : item.name}
                </p>
                <p className="text-white text-sm drop-shadow truncate">
                  {item.artist
                    ? item.artist.length > 30
                      ? `${item.artist.slice(0, 30)}...`
                      : item.artist
                    : null}
                </p>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li className="col-span-4">
          <StatusItem text="검색 결과가 없습니다.🔍" />
        </li>
      )}
    </ul>
  );
}

export default CommonList;
