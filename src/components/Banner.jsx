import React from "react";

const Banner = ({ searchTerm, onChange, onSearch }) => {
  return (
    <div
      className="relative w-full h-[350px] bg-cover bg-center"
      style={{ backgroundImage: "url('/banner.jpg')" }}
    >
      {/* Overlay for darkening the banner */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Search container */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[876px]">
        <div className="flex items-center bg-white rounded-full overflow-hidden shadow-lg">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for a movie, tv show or documentary..."
            value={searchTerm}
            onChange={onChange}
            className="flex-1 h-[72px] px-6 text-lg text-gray-800 outline-none border-none placeholder-gray-500"
          />

          {/* Search Button */}
          <button
            onClick={onSearch}
            className="h-[72px] px-10 bg-red-600 text-white text-lg font-semibold hover:bg-red-700 transition-all"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
