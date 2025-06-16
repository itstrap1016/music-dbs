function TopChart({ title }: { title: string }) {
  return (
    <div className="w-[calc(50%-40px)]">
      <h2 className="text-2xl dark:text-white">{title}</h2>
      <ul>
        {/* 1위 */}
        <li className="relative flex items-center py-3 border-b border-gray-100 dark:border-zinc-800 group">
          <img
            src="https://i.scdn.co/image/ab67616d0000b273b8e7e7e7e7e7e7e7e7e7e7e7"
            alt="Don’t Say You Love Me"
            className="absolute left-0 top-0 w-full h-full object-cover rounded-md opacity-90"
            style={{ zIndex: 0 }}
          />
          <div
            className="absolute left-0 top-0 w-full h-full bg-black/60 rounded-md"
            style={{ zIndex: 1 }}
          />
          <div
            className="relative flex items-center gap-3 p-4 w-full"
            style={{ zIndex: 2 }}
          >
            <span className="text-blue-400 text-lg font-bold">1</span>
            <img
              src="https://lastfm.freetls.fastly.net/i/u/34s/8e9b5a3e8b3e4e1c8e9b5a3e8b3e4e1c.png"
              alt="Don’t Say You Love Me"
              className="w-10 h-10 rounded object-cover border border-white"
            />
            <div>
              <a
                href="https://www.last.fm/music/Jin/_/Don%E2%80%99t+Say+You+Love+Me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base font-bold leading-tight hover:underline"
              >
                Don’t Say You Love Me
              </a>
              <div className="text-gray-200 text-sm">Jin</div>
            </div>
          </div>
        </li>
        {/* 2위 */}
        <li className="flex items-center py-3 border-b border-gray-100 dark:border-zinc-800 group">
          <span className="w-6 text-center text-lg font-semibold text-gray-400 group-hover:text-blue-600">
            2
          </span>
          <img
            src="https://www.last.fm/static/images/default_track.png"
            alt="Killin' It Girl (feat. GloRilla)"
            className="w-12 h-12 rounded-md object-cover mx-4 border border-gray-200 dark:border-zinc-700"
          />
          <div className="flex-1 min-w-0">
            <a
              href="https://www.last.fm/music/j-hope/_/Killin'+It+Girl+(feat.+GloRilla)"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-gray-900 dark:text-white truncate hover:underline"
            >
              Killin' It Girl (feat. GloRilla)
            </a>
            <div className="text-sm text-gray-500 dark:text-zinc-400 truncate">
              j-hope
            </div>
          </div>
        </li>
        {/* 3위 */}
        <li className="flex items-center py-3 border-b border-gray-100 dark:border-zinc-800 group">
          <span className="w-6 text-center text-lg font-semibold text-gray-400 group-hover:text-blue-600">
            3
          </span>
          <img
            src="https://i.scdn.co/image/ab67616d0000b273e3e3e3e3e3e3e3e3e3e3e3e3"
            alt="Mona Lisa"
            className="w-12 h-12 rounded-md object-cover mx-4 border border-gray-200 dark:border-zinc-700"
          />
          <div className="flex-1 min-w-0">
            <a
              href="https://www.last.fm/music/j-hope/_/Mona+Lisa"
              target="_blank"
              rel="noopener noreferrer"
              className="block font-medium text-gray-900 dark:text-white truncate hover:underline"
            >
              Mona Lisa
            </a>
            <div className="text-sm text-gray-500 dark:text-zinc-400 truncate">
              j-hope
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default TopChart;
