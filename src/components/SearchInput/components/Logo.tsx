import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <h1 className="text-4xl text-green-500 mb-8 dark:text-violet-500 font-medium">
        MUSIC-DBS
      </h1>
    </Link>
  );
}

export default Logo;
