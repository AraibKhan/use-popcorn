import WatchedMovie from "./WatchedMovie";

const WatchedMoviesList = ({ watched, onRemoveWatched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
