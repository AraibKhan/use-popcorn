import { useEffect, useRef } from "react";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  useEffect(() => {
    const callback = (e) => {
      if (document.activeElement === inputEl.current) return;
      if (e.code === "Enter") {
        setQuery("");
        inputEl.current.focus();
      }
    };
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
