import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={onChange}
        className="w-72 sm:w-96 px-4 py-2 text-black rounded-lg focus:outline-none"
      />
      <button
        onClick={onSearch}
        className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
