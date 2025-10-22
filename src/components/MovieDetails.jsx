import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [selectedTab, setSelectedTab] = useState("Overview");

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const fetchCast = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
      const data = await res.json();
      setCast(data.cast.slice(0, 12)); // increase to show more actors
    } catch (error) {
      console.error("Error fetching cast:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
      const data = await res.json();
      setVideos(data.results.filter((v) => v.type === "Trailer"));
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchSimilarMovies = async () => {
    try {
      const res = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
      const data = await res.json();
      setSimilar(data.results.slice(0, 8));
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
    fetchCast();
    fetchVideos();
    fetchSimilarMovies();
  }, [id]);

  if (!movie) return <p className="text-center mt-10 text-gray-300">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-[60px] py-[50px]">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 text-gray-400 hover:text-white transition"
      >
        ← Back
      </button>

      {/* Top Section: Poster + Title/Rating */}
      <div className="flex flex-row items-start gap-[40px] mb-10">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/412x562"
            }
            alt={movie.title}
            className="shadow-lg"
            style={{
              width: "412px",
              height: "562px",
              objectFit: "cover",
              borderRadius: "24px",
            }}
          />
        </div>

        {/* Title, Rating, and Info */}
        <div className="flex flex-col justify-start flex-1">
          {/* Title and Rating */}
          <div className="flex items-center gap-[80px]">
            <h1 className="font-bold" style={{ fontSize: "40px" }}>
              {movie.title}
            </h1>
            <p className="text-xl font-semibold text-yellow-400">
              {movie.vote_average?.toFixed(1) || "N/A"}
            </p>
          </div>

          {/* Year, Duration, Age Rating */}
          <div
            className="flex items-center gap-[35px] mt-[-35px]"
            style={{ fontSize: "20px", color: "#5c6f73" }}
          >
            <p>{movie.release_date?.split("-")[0] || "N/A"}</p>
            <p>{movie.runtime ? `${movie.runtime} min` : "Duration unavailable"}</p>
            <p>{movie.adult ? "18+" : "PG"}</p>
          </div>

          {/* Tabs Navigation */}
          <div className="mt-10 flex gap-[20px] pb-3" style={{ marginBottom: "40px" }}>
            {["Overview", "Cast", "Trailers", "More like this"].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`rounded-full font-semibold transition-all duration-300 ${
                  selectedTab === tab
                    ? "bg-[#f2790f]"
                    : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
                style={{
                  color: selectedTab === tab ? "#ffffff" : "#9ca3af",
                  fontSize: "16px",
                  padding: "9.6px 22.4px",
                  minWidth: "112px",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="mt-6">
            {selectedTab === "Overview" && (
              <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                {movie.overview || "No plot summary available."}
              </p>
            )}

            {selectedTab === "Cast" && (
  <div className="flex flex-wrap gap-[12px]">
    {cast.map((actor) => (
      <div
        key={actor.id}
        className="w-[150px] flex-shrink-0 text-left"
      >
        <img
          src={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
              : "https://via.placeholder.com/150x225"
          }
          alt={actor.name}
          className="rounded-xl mb-2"
          style={{ width: "150px", height: "225px", objectFit: "cover" }}
        />
        <p
          className="font-extrabold"
          style={{ fontSize: "16px", color: "#111111", marginBottom: "2px" }}
        >
          {actor.name}
        </p>
        <p
          className="font-normal text-[#5c6f73]"
          style={{ fontSize: "14px" }}
        >
          {actor.character}
        </p>
      </div>
    ))}
  </div>
)}

            {selectedTab === "Trailers" && (
              <div className="flex flex-wrap gap-6">
                {videos.length > 0 ? (
                  videos.slice(0, 2).map((video) => (
                    <iframe
                      key={video.id}
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      width="560"
                      height="315"
                      className="rounded-2xl shadow-lg"
                      allowFullScreen
                    ></iframe>
                  ))
                ) : (
                  <p className="text-gray-400">No trailers available.</p>
                )}
              </div>
            )}

            {selectedTab === "More like this" && (
              <div className="grid grid-cols-4 gap-6 mt-6">
                {similar.length > 0 ? (
                  similar.map((m) => (
                    <MovieCard key={m.id} movie={m} customWidth="160px" customHeight="230px" />
                  ))
                ) : (
                  <p className="text-gray-400">No similar movies found.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
