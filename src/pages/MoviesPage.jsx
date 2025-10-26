import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch movies function
  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${pageNum}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const normalizedResults = data.results.map((item) => ({
          ...item,
          media_type: "movie",
        }));

        // Append new results, filtering out duplicates by ID
        setMovies((prev) => {
          const newMovies = normalizedResults.filter(
            (item) => !prev.some((m) => m.id === item.id)
          );
          return [...prev, ...newMovies];
        });

        // Stop loading more if we reach the last page available
        if (pageNum >= data.total_pages || data.results.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        if (movies.length === 0) setError("No trending movies found.");
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("An error occurred while fetching movies.");
    }
    setLoading(false);
  };

  // Load initial movies
  useEffect(() => {
    fetchMovies(page);
  }, []);

  // Load more movies when button clicked
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Spacer for fixed header */}
      <div className="mt-[40px]"></div>

      <section className="px-[60px] flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white mb-4">Movies</h2>

        {loading && movies.length === 0 && (
          <p className="text-center mt-8">Loading movies...</p>
        )}
        {error && <p className="text-center text-red-400 mt-8">{error}</p>}

        <div
          className="grid mt-10 justify-center max-w-[1300px] mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            columnGap: "16px", // horizontal gap
            rowGap: "40px",
          }}
        >
          {movies.map((movie) => (
            <div key={`${movie.id}-movie`} className="flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-[#f2790f] text-[#ffffff] w-[140px] h-[50px] rounded-full font-bold text-lg hover:bg-orange-600 transition duration-200"
            >
              Load More
            </button>
          </div>
        )}

        {loading && movies.length > 0 && (
          <p className="text-center mt-8 text-gray-400">Loading more movies...</p>
        )}
      </section>
    </div>
  );
};

export default MoviesPage;
