import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieCard from "./components/MovieCard";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchMovies = async (title) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError("No movies found. Try a different title!");
      }
    } catch (err) {
      setError("Error fetching data. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchMovies("avengers"); // Default search on page load
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">
        Movie Database 🎬
      </h1>
      <SearchBar
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearch={() => searchMovies(searchTerm)}
      />

      {loading && <p className="text-center mt-8">Loading movies...</p>}
      {error && <p className="text-center text-red-400 mt-8">{error}</p>}

      <div className="grid gap-6 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default App;
