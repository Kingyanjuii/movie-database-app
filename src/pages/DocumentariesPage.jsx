import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const API_KEY = "bcb8cf769f51ae878cf1db997b3ae9ba";
const BASE_URL = "https://api.themoviedb.org/3";

const DocumentariesPage = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Documentaries function
  const fetchDocumentaries = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99&sort_by=popularity.desc&page=${pageNum}`
      );
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const normalizedResults = data.results.map((item) => ({
          ...item,
          media_type: "movie",
        }));

        // Append new results, filtering out duplicates by ID
        setDocs((prev) => {
          const newDocs = normalizedResults.filter(
            (item) => !prev.some((d) => d.id === item.id)
          );
          return [...prev, ...newDocs];
        });

        // Stop loading more if last page
        if (pageNum >= data.total_pages || data.results.length < 20) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
        if (docs.length === 0) setError("No trending documentaries found.");
      }
    } catch (err) {
      console.error("Error fetching documentaries:", err);
      setError("An error occurred while fetching documentaries.");
    }
    setLoading(false);
  };

  // Load initial documentaries
  useEffect(() => {
    fetchDocumentaries(page);
  }, []);

  // Load more handler
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchDocumentaries(nextPage);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Spacer for fixed header */}
      <div className="mt-[40px]"></div>

      <section className="px-[60px] flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-white mb-4">Documentaries</h2>

        {loading && docs.length === 0 && (
          <p className="text-center mt-8">Loading documentaries...</p>
        )}
        {error && <p className="text-center text-red-400 mt-8">{error}</p>}

        <div
          className="grid mt-10 justify-center max-w-[1300px] mx-auto"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            columnGap: "16px",
            rowGap: "40px",
          }}
        >
          {docs.map((doc) => (
            <div key={`${doc.id}-doc`} className="flex justify-center">
              <MovieCard movie={doc} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="flex justify-center mt-10">
            <button
              onClick={handleLoadMore}
              className="bg-[#f2790f] text-[#ffffff] w-[140px] h-[50px] rounded-full font-bold text-lg hover:bg-orange-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {loading && docs.length > 0 && (
          <p className="text-center mt-8 text-gray-400">Loading more documentaries...</p>
        )}
      </section>
    </div>
  );
};

export default DocumentariesPage;
