import React from "react";

const Banner = ({ searchTerm, onChange, onSearch }) => {
  return (
    <div
      className="relative w-full h-[350px] bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Search container */}
      <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex w-[850px] h-[60px] rounded-full shadow-2xl overflow-hidden bg-white">
          
          {/* Input with proper placeholder padding */}
          <input
            type="text"
            value={searchTerm}
            onChange={onChange}
            placeholder="Search for a movie, TV show or documentary..."
            className="flex-1 h-full bg-white text-black text-lg border-none focus:outline-none rounded-l-full pl-[30px] placeholder-gray-500"
          />

          {/* Search button */}
          <button
            onClick={onSearch}
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
