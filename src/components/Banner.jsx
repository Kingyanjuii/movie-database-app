import React from "react";

const Banner = ({ searchTerm, onChange, onSearch }) => {
  return (
    <div
      className="relative w-full h-[350px] bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      {/* Overlay for darkening the banner */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Search container */}
      <div className="absolute bottom-[25%] left-1/2 transform -translate-x-1/2 w-[720px]">
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-2xl border border-gray-300 transition-all">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a movie, TV show or documentary..."
            value={searchTerm}
            onChange={onChange}
            className="flex-1 h-[60px] px-6 text-lg text-black bg-white placeholder-gray-500 focus:outline-none border-none"
          />

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="h-[60px] px-36 bg-[#f2790f] text-white text-lg font-semibold hover:bg-[#e06900] transition-all duration-300"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
