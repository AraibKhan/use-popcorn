import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Search from "./components/Search";
import NumResults from "./components/NumResults";
import Box from "./components/Box";
import MovieList from "./components/MovieList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loader from "./components/Loader";
import MovieDetails from "./components/MovieDetails";

const KEY = "5a5f408d";

function ErrorMsg({ msg }) {
  return (
    <p className="error">
      <span>⛔</span> {msg}
    </p>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=${KEY}`
        );
        if (!res.ok)
          throw new Error("Something went wrong while fetching movies.");
        const data = await res.json();
        if (data.Response === "False") throw new Error("No movie found!");
        setMovies(data.Search);
      } catch (e) {
        setIsError(e.message);
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
    fetchData();
  }, [query]);

  const handleSelectedMovie = (id) => {
    if (id === selectedId) {
      setSelectedId(null);
      return;
    }
    setSelectedId(id);
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((movies) => [...movies, movie]);
  };

  const handleRemoveWatched = (movieID) => {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== movieID));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !isError && (
            <MovieList
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {isError !== "" && <ErrorMsg msg={isError} />}
        </Box>
        <Box>
          {!selectedId && (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
          {selectedId && (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watchedMovies={watched}
            />
          )}
        </Box>
      </Main>
    </>
  );
}
