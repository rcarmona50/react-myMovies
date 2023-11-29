import { useEffect, useRef } from "react";

export default function Search({ query, setQuery }) {
  const inputEl = useRef(null);
  useEffect(
    function () {
      function poop(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", poop);
      return () => document.addEventListener("keydown", poop);
    },
    [setQuery]
  );
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
}
