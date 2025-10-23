import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import filamudbLogo from "../assets/filamudb-logo.png";

const Header = ({ searchTerm, setSearchTerm, showSearch, setShowSearch }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowHeader(currentScrollY <= lastScrollY || currentScrollY < 80);
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (showSearch && inputRef.current) inputRef.current.focus();
  }, [showSearch]);

  const isActive = (path) => location.pathname === path;

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    // Navigate same way as Banner.jsx
    if (location.pathname === "/search") {
      navigate("/search", { state: { query: searchTerm, timestamp: Date.now() } });
    } else {
      navigate("/search", { state: { query: searchTerm } });
    }
    setShowSearch(false); // Hide search after submitting
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    navigate("/");
  };

  const handleNavClick = (path) => {
    setSearchTerm("");
    navigate(path);
  };

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
          <div
            onClick={handleLogoClick}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img
              src={filamudbLogo}
              alt="FilamuDB Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          <nav className="flex gap-[65px]">
            {["/movies", "/tvshows", "/documentaries"].map((path, i) => (
              <span
                key={path}
                onClick={() => handleNavClick(path)}
                className={`font-bold cursor-pointer transition-colors duration-300 ${
                  isActive(path)
                    ? "text-[#f2790f]"
                    : "text-[#5c6f73] hover:text-[#f2790f]"
                }`}
              >
                {["Movies", "TV Shows", "Documentaries"][i]}
              </span>
            ))}
          </nav>

          <div
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ right: "150px", zIndex: 60 }}
          >
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

      {/* Spacer */}
      <div style={{ height: "120px" }} />

      {/* Search input below header */}
      <div
        className={`w-full px-6 bg-white shadow-md transition-all duration-300`}
        style={{
          maxHeight: showSearch ? "120px" : "0px",
          overflow: "hidden",
          zIndex: 55,
          position: "relative",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a movie, TV show or documentary..."
          className={`w-full px-4 py-3 rounded-md bg-gray-100 text-black placeholder-gray-500 focus:outline-none shadow-lg transition-opacity duration-300 ${
            showSearch
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          style={{ fontSize: "22px" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </>
  );
};

export default Header;
