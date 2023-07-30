import { useState, useEffect } from "react";

const KEY = "5a5f408d";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong while fetching movies.");
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movie found!");
        setMovies(data.Search);
      } catch (e) {
        if (e.name !== "AbortError") {
          setIsError(e.message);
        }
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setIsError("");
      return;
    }
    // handleCloseMovie();
    fetchData();

    return () => controller.abort();
  }, [query]);

  return { movies, isLoading, isError };
};
