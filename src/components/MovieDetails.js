const MovieDetails = ({ selectedId, handleCloseMovie }) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={handleCloseMovie}>
        ←
      </button>
      {selectedId}
    </div>
  );
};

export default MovieDetails;
