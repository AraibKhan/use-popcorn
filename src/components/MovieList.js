import Movie from "./Movie";

const MovieList = ({ movies, handleSelectedMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          handleSelectedMovie={handleSelectedMovie}
        />
      ))}
    </ul>
  );
};

export default MovieList;
