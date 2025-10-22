import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Banner from "./components/Banner";
import MovieDetails from "./components/MovieDetails";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("Movies");

  const searchMovies = async (title) => {
    if (!title.trim()) return;
    setLoading(true);
    setError("");

    try {
      // use multi search so results include movies and TV shows
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(
          title
        )}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // keep only movie/tv items or documentaries by genre id 99 (if present)
        const validResults = data.results.filter(
          (item) =>
            item.media_type === "movie" ||
            item.media_type === "tv" ||
            (Array.isArray(item.genre_ids) && item.genre_ids.includes(99))
        );

        // ensure every item has a media_type for downstream logic
        const normalized = validResults.map((it) => {
          if (it.media_type) return it;
          // if no media_type but has title -> movie, else tv
          return {
            ...it,
            media_type: it.title ? "movie" : "tv",
          };
        });

        setMovies(normalized);
      } else {
        setError("No movies found. Try another search!");
        setMovies([]);
      }
    } catch (err) {
      console.error("searchMovies error:", err);
      setError("An error occurred while fetching data.");
      setMovies([]);
    }
    setLoading(false);
  };

  const fetchTrending = async (category) => {
    setLoading(true);
    setError("");

    try {
      let url = "";
      if (category === "Movies") {
        url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
      } else if (category === "TV Shows") {
        url = `${BASE_URL}/trending/tv/week?api_key=${API_KEY}`;
      } else if (category === "Documentaries") {
        // Use Discover API for documentaries
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&sort_by=popularity.desc`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        // Normalize results so each item includes media_type
        const normalizedResults = data.results.map((item) => ({
          ...item,
          media_type:
            category === "Movies"
              ? "movie"
              : category === "TV Shows"
              ? "tv"
              : // for documentaries we label as movie (documentary) so details fetch as movie
                "movie",
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

  useEffect(() => {
    fetchTrending(filter);
  }, [filter]);

  const MainPage = () => (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
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
            className="flex items-center rounded-full overflow-hidden shadow-2xl bg-white transition-all"
            style={{ width: "850px", height: "50px" }}
          >
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a movie, TV show or documentary..."
              className="flex-1 h-full px-6 text-black placeholder-gray-500 bg-white focus:outline-none border-none text-lg"
            />
            <button
              onClick={() => searchMovies(searchTerm)}
              className="h-full px-[40px] bg-[#f2790f] text-[#ffffff] font-semibold text-lg hover:bg-[#e06900] transition-all duration-300 border-none outline-none"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="mt-12 px-[60px] flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>

        {/* Tab Buttons styled like MovieDetails */}
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

        <div className="h-[40px]"></div>
      </section>

      {/* Main Content */}
      <main className="flex-grow px-[30px] pb-10">
        {loading && <p className="text-center mt-8">Loading movies...</p>}
        {error && <p className="text-center text-red-400 mt-8">{error}</p>}

        <div
          className="grid gap-8 mt-10 justify-center max-w-[1200px] mx-auto"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}
        >
          {movies.map((movie) => (
            <MovieCard key={`${movie.id}-${movie.media_type || "movie"}`} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* keep backward-compatible movie route */}
        <Route path="/movie/:id" element={<MovieDetails />} />
        {/* keep tv route as well */}
        <Route path="/tv/:id" element={<MovieDetails />} />
        {/* unified route that includes media type explicitly */}
        <Route path="/details/:mediaType/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
