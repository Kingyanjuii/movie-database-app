import React, { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Banner = ({ searchTerm, setSearchTerm }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    if (location.pathname === "/search") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}&ts=${Date.now()}`);
    } else {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  // Autofocus input
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  return (
    <div
      className="relative w-full h-[350px] bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex w-[850px] h-[60px] rounded-full shadow-2xl overflow-hidden bg-white">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a movie, TV show or documentary..."
            className="flex-1 h-full bg-white text-black text-lg border-none focus:outline-none rounded-l-full pl-[30px] placeholder-gray-500"
            style={{ fontSize: "22px" }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="h-full px-10 bg-[#f2790f] text-white font-semibold text-lg hover:bg-[#e06900] transition-all rounded-r-full border-none outline-none"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
