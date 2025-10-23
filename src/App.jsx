import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Banner from "./components/Banner";
import MovieDetails from "./components/MovieDetails";
import MoviesPage from "./pages/MoviesPage";
import TVShowsPage from "./pages/TVShowsPage";
import DocumentariesPage from "./pages/DocumentariesPage";
import SearchResultsPage from "./pages/SearchResultsPage"; // new

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("Movies");

  // Fetch trending content by category
  const fetchTrending = async (category) => {
    setLoading(true);
    setError("");
    try {
      let url = "";
      if (category === "Movies") url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
      else if (category === "TV Shows") url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`;
      else if (category === "Documentaries") url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&sort_by=popularity.desc`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const normalizedResults = data.results.map((item) => ({
          ...item,
          media_type:
            category === "Movies"
              ? "movie"
              : category === "TV Shows"
              ? "tv"
              : "movie",
        }));
        setMovies(normalizedResults);
      } else {
        setMovies([]);
        setError("No trending content found for this category.");
      }
    } catch (err) {
      console.error("fetchTrending error:", err);
      setError("An error occurred while fetching trending data.");
      setMovies([]);
    }
    setLoading(false);
  };

  // Fetch trending content on category change
  useEffect(() => {
    fetchTrending(filter);
  }, [filter]);

  const MainPage = () => (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="mt-[150px]"></div>
      <Banner searchTerm={searchTerm} setSearchTerm={setSearchTerm} filter={filter} />
      <section className="mt-12 px-[60px] flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>
        <div className="flex gap-[20px] pb-3" style={{ marginBottom: "20px" }}>
          {["Movies", "TV Shows", "Documentaries"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`rounded-full font-semibold transition-all duration-300 ${
                filter === type
                  ? "bg-[#f2790f]"
                  : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
              style={{
                color: filter === type ? "#ffffff" : "#9ca3af",
                fontSize: "16px",
                padding: "9.6px 22.4px",
                minWidth: "160px",
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      <main className="flex-grow px-[30px] pb-10">
        {loading && <p className="text-center mt-8">Loading movies...</p>}
        {error && <p className="text-center text-red-400 mt-8">{error}</p>}

        <div
          className="grid gap-8 mt-10 justify-center max-w-[1200px] mx-auto"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}
        >
          {movies.map((movie) => (
            <MovieCard
              key={`${movie.id}-${movie.media_type || "movie"}`}
              movie={movie}
            />
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Header setFilter={setFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchResultsPage />} /> {/* New search results page */}
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/tvshows" element={<TVShowsPage />} />
        <Route path="/documentaries" element={<DocumentariesPage />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<MovieDetails />} />
        <Route path="/details/:mediaType/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
