import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Banner = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    if (location.pathname === "/search") {
      navigate("/search", { state: { query: searchTerm, timestamp: Date.now() } });
    } else {
      navigate("/search", { state: { query: searchTerm } });
    }
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div
      className="relative w-full h-[350px] bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* Search input */}
      <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex w-[850px] h-[60px] rounded-full shadow-2xl overflow-hidden bg-white">
          
          <input
            type="text"
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie, TV show or documentary..."
            className="h-full bg-white text-black text-lg border-none focus:outline-none pl-[30px] placeholder-gray-500"
            style={{ fontSize: "22px", flex: 1 }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />

          <button
            onClick={handleSearch}
            className="h-full w-[160px] bg-[#f2790f] text-[#ffffff] font-semibold text-2xl hover:bg-[#e06900] transition-all border-none outline-none"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
