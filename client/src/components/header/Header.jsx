import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:from-indigo-700 hover:to-purple-700"
          >
            ChatiFy
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/features"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 font-medium"
            >
              About
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-all duration-300 font-medium"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow hover:shadow-md"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
