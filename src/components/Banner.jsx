import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import filamudbLogo from "../assets/filamudb-logo.png";

const Header = ({ searchTerm, setSearchTerm, showSearch, setShowSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const state = location.pathname === "/search"
      ? { query: searchTerm, timestamp: Date.now() }
      : { query: searchTerm };

    navigate("/search", { state });
    setShowSearch(false);
  };

  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  return (
    <header className="w-full flex justify-between items-center px-8 py-4 bg-gray-950 text-white relative z-50">
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <img src={filamudbLogo} alt="FilamuDB Logo" className="w-[55px]" />
        <h1 className="text-2xl font-bold">FilamuDB</h1>
      </div>

      <div className="flex items-center gap-6">
        <Search
          size={26}
          className="cursor-pointer hover:text-[#f2790f]"
          onClick={() => setShowSearch(true)}
        />
      </div>

      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-gray-900 p-4 flex justify-center shadow-lg z-40">
          <div className="flex w-[750px] h-[55px] rounded-full overflow-hidden bg-white">
            <input
              type="text"
              ref={inputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="flex-1 h-full bg-white text-black text-lg border-none focus:outline-none rounded-l-full pl-[25px]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleSearch}
              className="h-full px-8 bg-[#f2790f] text-white font-semibold hover:bg-[#e06900] transition-all border-none rounded-r-full"
            >
              Search
            </button>
          </div>

          <X
            size={30}
            className="ml-4 cursor-pointer text-gray-400 hover:text-white"
            onClick={() => setShowSearch(false)}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
