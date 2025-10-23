import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const stateQuery = location.state?.query || "";
    if (!stateQuery.trim()) return;

    setQuery(stateQuery);
    setResults([]);
    fetchSearchResults(stateQuery);
  }, [location.state?.query, location.state?.timestamp]);

  const fetchSearchResults = async (term) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(term)}`
      );
      const data = await response.json();

      if (data.results?.length > 0) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen px-12 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Search Results for “{query}”
      </h1>

      {loading && <p className="text-center text-gray-400">Loading...</p>}

      {!loading && results.length === 0 && query && (
        <p className="text-center text-gray-400">No results found.</p>
      )}

      {/* ✅ 5 columns, 20% tighter spacing, centered */}
      <div className="grid grid-cols-5 gap-[3px] mt-10 justify-items-center">
        {results.map((item) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
