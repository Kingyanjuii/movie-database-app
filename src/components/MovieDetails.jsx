import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError("Failed to fetch movie details.");
      }
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-8 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-400">{error}</p>;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find((vid) => vid.type === "Trailer")?.key;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-10 py-10">
      {/* Top Section: Poster + Info */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Poster */}
        <div className="flex-shrink-0">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/412x562"
            }
            alt={movie.title}
            className="rounded-xl shadow-lg"
            style={{ width: "412px", height: "562px", objectFit: "cover" }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col justify-start gap-4">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-gray-400">
            {movie.release_date} | {movie.genres?.map((g) => g.name).join(", ")}
          </p>
          <p className="text-lg leading-relaxed">{movie.overview}</p>

          {/* Ratings */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Ratings</h2>
            <p>TMDb: {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
          </div>

          {/* Cast */}
          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-2">Main Cast</h2>
            <ul className="list-disc list-inside">
              {movie.credits?.cast?.slice(0, 5).map((actor) => (
                <li key={actor.cast_id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trailer Section */}
      {trailer && (
        <div className="mt-10">
          <h2 className="text-3xl font-semibold mb-4">Trailer</h2>
          <div className="w-full h-[480px]">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-xl shadow-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
