import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchPreview } from "../../api/searchApi";
import PreviewList from "./components/PreviewList";
import Logo from "./components/Logo";

function SearchInput() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialType = searchParams.get("type") || "track";
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState(initialType);
  const [preview, setPreview] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const intitalStickyPos = useRef<number>(0);
  const wrapperRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    intitalStickyPos.current =
      wrapperRef.current?.getBoundingClientRect().top ?? 0;
    const handleScroll = () => {
      if (window.scrollY >= intitalStickyPos.current) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setPreviewVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (hasTyped && query.trim() && preview.length > 0) {
      setPreviewVisible(true);
    } else {
      setPreviewVisible(false);
    }
  }, [preview, query, hasTyped]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      const data = await searchPreview(query.trim(), searchType);
      setPreview(data.slice(0, 100));
    }, 1000);

    return () => clearTimeout(timer);
  }, [query, searchType]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(query.trim())}&type=${searchType}`
      );
      setPreviewVisible(false);
      setHasTyped(false);
    }
  };

  const resetAll = () => {
    setQuery("");
    setPreview([]);
    setPreviewVisible(false);
    setHasTyped(false);
  };

  const handleChangeSearchType = (e: React.FormEvent<HTMLSelectElement>) => {
    setSearchType(e.currentTarget.value);
    resetAll();
  };

  const handleInputClearClick = () => {
    resetAll();
  };

  const handleInputFocus = () => {
    if (query.trim() && preview.length > 0) {
      setPreviewVisible(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setHasTyped(true);
  };

  return (
    <div className="min-h-[176px] flex flex-col pt-12 items-center">
      <Logo />
      <form
        onSubmit={handleSearch}
        className={`flex gap-2 w-full items-center justify-center ${
          isSticky && "bg-white py-2 fixed top-0 shadow-md dark:bg-zinc-800"
        }`}
        ref={wrapperRef}
      >
        <div className="w-[600px]">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              placeholder={
                searchType === "track"
                  ? "곡명을 입력해주세요"
                  : searchType === "album"
                  ? "앨범명을 입력해주세요"
                  : "아티스트명을 입력해주세요"
              }
              className={`border-gray-300 border-[1px] w-full h-14 rounded-2xl pl-5 placeholder-zinc-400 text-base dark:text-white dark:border-zinc-600 focus:outline-none ${
                preview.length > 0 &&
                previewVisible &&
                "rounded-b-none border-b-0"
              }`}
            />
            {query ? (
              <button
                type="button"
                className="absolute top-1/2 -translate-y-1/2 right-4"
                onClick={handleInputClearClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-500 dark:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ) : null}
            {preview.length > 0 && previewVisible && (
              <PreviewList preview={preview} searchType={searchType} />
            )}
          </div>
        </div>
        <select
          className="border-gray-300 border-[1px] w-[150px] pl-2 h-14 rounded-2xl placeholder-zinc-400  dark:text-white dark:border-zinc-600 dark:bg-zinc-800"
          value={searchType}
          onChange={handleChangeSearchType}
        >
          <option value="track">곡명</option>
          <option value="album">앨범명</option>
          <option value="artist">아티스트명</option>
        </select>
        <button className="bg-green-500 w-12 h-12 rounded-full flex justify-center items-center dark:bg-violet-500">
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
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
