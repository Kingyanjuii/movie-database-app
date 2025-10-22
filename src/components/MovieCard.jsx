import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, customWidth, customHeight }) => {
  const navigate = useNavigate();

  const title = movie.title || movie.name || "Untitled";
  const poster = movie.poster
    ? movie.poster
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/210x287";
  const year =
    movie.year || (movie.release_date ? movie.release_date.split("-")[0] : "N/A");

  return (
    <div
      className="bg-gray-800 p-2 rounded-3xl shadow-lg hover:scale-105 transition-transform overflow-hidden cursor-pointer"
      style={{ width: customWidth || "210px" }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          width: customWidth || "210px",
          height: customHeight || "287px",
        }}
      >
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover"
          style={{ borderRadius: "14px" }}
        />
      </div>
      <h3 className="text-[18px] font-semibold mt-2 mb-1">{title}</h3>
      <p className="text-gray-400">{year}</p>
    </div>
  );
};

export default MovieCard;
