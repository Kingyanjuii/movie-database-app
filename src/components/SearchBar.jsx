import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex justify-center items-center">
      {/* Input wrapper */}
      <div className="w-72 sm:w-96">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search for a movie..."
          className="w-full h-12 bg-white text-black rounded-lg border border-gray-300 focus:outline-none pl-[20px] placeholder-gray-500"
        />
      </div>

      {/* Button */}
      <button
        onClick={onSearch}
        className="ml-3 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
