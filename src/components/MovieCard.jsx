import React from "react";

const MovieCard = ({ movie }) => {
  // Handle TMDB fields gracefully (title or name for TV shows)
  const title = movie.title || movie.name || "Untitled";
  const poster = movie.poster
    ? movie.poster
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/210x287";

  const year =
    movie.year ||
    (movie.release_date ? movie.release_date.split("-")[0] : "N/A");

  return (
    <div className="bg-gray-800 p-2 rounded-lg shadow-lg hover:scale-105 transition-transform w-[210px]">
      <div className="w-[210px] h-[287px] overflow-hidden rounded-md">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mt-2 truncate w-[210px]">{title}</h3>
      <p className="text-gray-400">{year}</p>
    </div>
  );
};

export default MovieCard;
