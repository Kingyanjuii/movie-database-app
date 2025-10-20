import React from "react";
import { Search } from "lucide-react";
import filamudbLogo from "../assets/filamudb-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-black text-white" style={{ paddingBottom: "40px" }}>
      {/* Main container: space between logo+nav and search icon */}
      <div className="flex justify-between items-center" style={{ paddingRight: "30px", paddingLeft: "32px" }}>
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center" style={{ gap: "65px" }}>
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src={filamudbLogo}
              alt="FilamuDB Logo"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Navigation Buttons */}
          <nav className="flex" style={{ gap: "65px" }}>
            <button className="bg-transparent border-none text-[#f2790f] font-bold hover:text-yellow-400 p-0">
              Movies
            </button>
            <button className="bg-transparent border-none text-[#f2790f] font-bold hover:text-yellow-400 p-0">
              TV Shows
            </button>
            <button className="bg-transparent border-none text-[#f2790f] font-bold hover:text-yellow-400 p-0">
              Documentaries
            </button>
          </nav>
        </div>

        {/* Search Icon */}
        <div className="flex items-center">
          <Search className="w-6 h-6 cursor-pointer hover:text-gray-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
