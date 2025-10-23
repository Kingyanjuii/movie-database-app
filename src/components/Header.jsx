import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import filamudbLogo from "../assets/filamudb-logo.png";

const Header = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

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
    <>
      {/* Header */}
      <header
        className={`w-full fixed top-0 left-0 z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: "#ffffff",
          padding: "20px 32px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
          overflowX: "hidden",
        }}
      >
        <div className="flex items-center gap-[65px] relative">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4">
            <img
              src={filamudbLogo}
              alt="FilamuDB Logo"
              className="h-12 w-auto object-contain cursor-pointer"
            />
          </Link>

          {/* Navigation */}
          <nav className="flex gap-[65px]">
            <Link
              to="/movies"
              className={`font-bold no-underline transition-colors duration-300 ${
                isActive("/movies")
                  ? "text-[#f2790f]"
                  : "text-[#5c6f73] hover:text-[#f2790f]"
              }`}
            >
              Movies
            </Link>
            <Link
              to="/tvshows"
              className={`font-bold no-underline transition-colors duration-300 ${
                isActive("/tvshows")
                  ? "text-[#f2790f]"
                  : "text-[#5c6f73] hover:text-[#f2790f]"
              }`}
            >
              TV Shows
            </Link>
            <Link
              to="/documentaries"
              className={`font-bold no-underline transition-colors duration-300 ${
                isActive("/documentaries")
                  ? "text-[#f2790f]"
                  : "text-[#5c6f73] hover:text-[#f2790f]"
              }`}
            >
              Documentaries
            </Link>
          </nav>

          {/* Search Icon */}
          <div className="absolute top-1/2 transform -translate-y-1/2" style={{ right: "150px", zIndex: 60 }}>
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
      </header>

      {/* Search Bar */}
      {showSearch && (
        <div
          className="fixed left-0 w-full z-55 px-6"
          style={{ top: "110px" }} // adjust to match header height
        >
          <input
            type="text"
            placeholder="Search for a movie, TV show or documentary..."
            className="w-full px-4 py-6 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none shadow-lg"
            style={{ fontSize: "20px" }}
          />
        </div>
      )}
    </>
  );
};

export default Header;
