import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import filamudbLogo from "../assets/filamudb-logo.png";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  // Detect scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        backgroundColor: "#ffffff",       // solid white
        padding: "20px 32px 20px 32px",   // uniform padding
        boxShadow: "0 2px 10px rgba(0,0,0,0.5)", // keep shadow
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-[65px]">
          <Link to="/" className="flex items-center space-x-4">
            <img
              src={filamudbLogo}
              alt="FilamuDB Logo"
              className="h-12 w-auto object-contain cursor-pointer"
            />
          </Link>

          <nav className="flex gap-[65px]">
            <Link
              to="/movies"
              className={`font-bold transition-colors duration-300 ${
                isActive("/movies")
                  ? "text-[#f2790f]"
                  : "text-gray-700 hover:text-[#f2790f]"
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tvshows"
              className={`font-bold transition-colors duration-300 ${
                isActive("/tvshows")
                  ? "text-[#f2790f]"
                  : "text-gray-700 hover:text-[#f2790f]"
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/documentaries"
              className={`font-bold transition-colors duration-300 ${
                isActive("/documentaries")
                  ? "text-[#f2790f]"
                  : "text-gray-700 hover:text-[#f2790f]"
              }`}
            >
              Documentaries
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          {showSearch ? (
            <X
              className="w-6 h-6 cursor-pointer hover:text-[#f2790f]"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <Search
              className="w-6 h-6 cursor-pointer hover:text-[#f2790f]"
              onClick={() => setShowSearch(true)}
            />
          )}
        </div>
      </div>

      {showSearch && (
        <div className="absolute top-full left-0 w-full bg-white py-4 px-6 shadow-lg border-t border-gray-200">
          <input
            type="text"
            placeholder="Search for a movie, TV show or documentary..."
            className="w-full px-4 py-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
