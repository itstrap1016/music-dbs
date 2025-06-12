import { Link } from "react-router-dom";
import type { SearchIF } from "../../../types/searchTypes";
import StatusItem from "./StatusItem";

interface CommonListIF {
  items: SearchIF[];
  lastItemRef: (node: HTMLElement | null) => void;
}

function CommonList({ items, lastItemRef }: CommonListIF) {
  return (
    <ul className="max-w-[814px] mx-auto mt-14 pb-14 flex flex-wrap">
      {items.length > 0 ? (
        items.map((item, index) => (
          <li
            className="w-1/4 aspect-square overflow-hidden"
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
                <div className="w-full h-full bg-gray-200 dark:bg-zinc-500"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-4 left-4 right-2 z-10">
                <p className="text-white font-medium drop-shadow mb-2 group-hover:underline">
                  {item.name.length > 30 ? item.name.slice(0, 30) : item.name}
                </p>
                <p className="text-white text-sm drop-shadow">
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
        <StatusItem text="검색 결과가 없습니다.🔍" />
      )}
    </ul>
  );
}

export default CommonList;
