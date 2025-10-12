import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
        alt={movie.Title}
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-3">{movie.Title}</h3>
      <p className="text-gray-400">{movie.Year}</p>
    </div>
  );
};

export default MovieCard;
