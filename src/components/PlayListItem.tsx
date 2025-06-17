import { Link } from "react-router-dom";

interface PlayListItemInterface {
  artist: string | undefined;
  name: string;
  index: number;
  length: number;
  handlePlayClick: (artist: string, name: string) => Promise<void>;
  lastItemRef?: (node: HTMLElement | null) => void;
}

function PlayListItem({
  artist,
  name,
  index,
  length,
  handlePlayClick,
  lastItemRef,
}: PlayListItemInterface) {
  return (
    <li
      key={index}
      ref={index === length - 1 ? lastItemRef : undefined}
      className="h-12 border-b-[1px] border-gray-200 dark:border-zinc-700 flex items-center hover:bg-gray-100 dark:hover:bg-zinc-900 group px-3.5"
    >
      <button
        className="w-8 h-8 mr-2"
        onClick={() => handlePlayClick(artist ?? "", name)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 w-8 h-8 text-green-500 dark:text-violet-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
      </button>
      <Link
        to={`/track/${encodeURIComponent(artist ?? "")}/${encodeURIComponent(
          name
        )}`}
        className="w-full h-full flex items-center justify-between"
      >
        <p className="font-medium dark:text-white group-hover:underline">
          {name.length > 60 ? `${name.slice(0, 60)}...` : name}
        </p>
        <p className="text-gray-400 text-sm dark:text-zinc-400">
          {(artist ?? "").length > 20
            ? `${(artist ?? "").slice(0, 20)}...`
            : artist ?? ""}
        </p>
      </Link>
    </li>
  );
}

export default PlayListItem;
