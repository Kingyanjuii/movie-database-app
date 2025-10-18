import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 p-2 rounded-lg shadow-lg hover:scale-105 transition-transform w-[210px]">
      <div className="w-[210px] h-[287px] overflow-hidden rounded-md">
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/210x287"
          }
          alt={movie.Title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mt-2 truncate w-[210px]">{movie.Title}</h3>
      <p className="text-gray-400">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
