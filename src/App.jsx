import React, { useState, useEffect } from "react";
import Header from "./components/Header";
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
    searchMovies("avengers");
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Banner Section */}
      <section
        className="relative w-full h-[350px] bg-cover bg-center"
        style={{ backgroundImage: "url('/banner.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Search Bar */}
        <div className="absolute left-1/2 bottom-[25%] transform -translate-x-1/2 z-10">
          <div
            className="flex items-center rounded-full overflow-hidden shadow-2xl backdrop-blur-md bg-white/25 border border-white/30 transition-all"
            style={{ width: "500px", height: "72px" }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a movie, tv show or documentary..."
              className="flex-1 h-full px-6 text-black placeholder-gray-700 bg-transparent focus:outline-none border-none"
            />
            <button
              onClick={() => searchMovies(searchTerm)}
              className="h-full px-8 bg-white text-black font-semibold text-lg hover:bg-gray-200 hover:shadow-md transition-all"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow px-6 py-10">
        {loading && <p className="text-center mt-8">Loading movies...</p>}
        {error && <p className="text-center text-red-400 mt-8">{error}</p>}

        {/* Movie Grid */}
        <div
          className="grid gap-10 mt-10 justify-center max-w-[1200px] mx-auto"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
