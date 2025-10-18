import React from "react";
import { Search } from "lucide-react";
import filamudbLogo from "../assets/filamudb-logo.png";

const Header = () => {
  return (
    <header className="w-full bg-black text-white">
      <div className="max-w-[1280px] h-[150px] mx-auto flex items-center justify-between px-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src={filamudbLogo}
            alt="FilamuDB Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* Navigation Buttons */}
        <nav className="flex items-center gap-16">
          <button className="hover:text-gray-400">Movies</button>
          <button className="hover:text-gray-400">TV Shows</button>
          <button className="hover:text-gray-400">Documentaries</button>
          <Search className="w-6 h-6 cursor-pointer hover:text-gray-400" />
        </nav>
      </div>
    </header>
  );
};

export default Header;
