import { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({ selectedId, handleCloseMovie }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${"5a5f408d"}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {!isLoading && (
        <>
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              ←
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>⭐{movie.imdbRating} IMDb Rating</p>
            </div>
          </header>

          <section>
            <div className="rating">
              <StarRating maxRating={10} size={28} />
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default MovieDetails;
