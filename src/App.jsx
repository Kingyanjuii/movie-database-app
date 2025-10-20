import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import Banner from "./components/Banner";

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
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          title
        )}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setMovies(data.results);
      } else {
        setError("No movies found. Try another search!");
        setMovies([]);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
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
        setMovies(data.results);
      } else {
        setMovies([]);
        setError("No trending content found for this category.");
      }
    } catch (error) {
      setError("An error occurred while fetching trending data.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTrending(filter);
  }, [filter]);

  return (
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
      <section className="mt-12 px-[30px] flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-white mb-4">Trending</h2>

        {/* Single Curved Box Toggle */}
        <div className="relative flex bg-gray-800 rounded-full">
          {/* Sliding Active Indicator */}
          <div
            className="absolute top-1 left-1 bg-[#f2790f] rounded-full z-0 transition-all duration-300"
            style={{
              width: "200px",
              height: "35px",
              transform: `translateX(${
                ["Movies", "TV Shows", "Documentaries"].indexOf(filter) * 200
              }px)`,
            }}
          ></div>

          {["Movies", "TV Shows", "Documentaries"].map((type, index) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`relative z-10 w-[200px] h-[35px] text-lg font-semibold text-center bg-transparent transition-all duration-300 ${
                filter === type ? "text-white" : "text-gray-300 hover:text-white"
              } ${
                index === 0
                  ? "rounded-l-full"
                  : index === 2
                  ? "rounded-r-full"
                  : ""
              }`}
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
            <MovieCard
              key={movie.id}
              movie={{
                title: movie.title || movie.name,
                poster: movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/no-poster.jpg",
                year: movie.release_date
                  ? movie.release_date.split("-")[0]
                  : "N/A",
              }}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
