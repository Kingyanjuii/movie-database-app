import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchResultsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError("");
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      setResults([]);

      try {
        const response = await fetch(
          `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        const data = await response.json();

        if (data.results && data.results.length > 0) {
          setResults(data.results);
        } else {
          setResults([]);
          setError("No results found.");
        }
      } catch (err) {
        console.error("SearchResultsPage error:", err);
        setResults([]);
        setError("An error occurred while fetching search results.");
      }

      setLoading(false);
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-[30px] pt-[150px]">
      <h2 className="text-2xl font-bold mb-6">
        Search Results for: "{query}"
      </h2>

      {loading && <p className="text-center mt-8">Loading results...</p>}
      {error && <p className="text-center text-red-400 mt-8">{error}</p>}

      <div
        className="grid gap-8 mt-10 justify-center max-w-[1200px] mx-auto"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))" }}
      >
        {results.map((item) => (
          <MovieCard
            key={`${item.id}-${item.media_type || "movie"}`}
            movie={item}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
