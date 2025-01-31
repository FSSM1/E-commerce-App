import { NavLink } from "react-router-dom";
import NavLinks from "../client/NavLinks";
import ProfileDropdown from "../ProfileDropdown";
import { useContext, useState } from 'react';
import { SearchContext } from '../../components/productsClient/SearchContext';

const Navbar = () => {
  const { setSearchTerm } = useContext(SearchContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto flex justify-end px-4">
          <select className="bg-black text-white border-none focus:outline-none">
            <option>English</option>
            <option>Other Language</option>
          </select>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <NavLink to="/client/home">Exclusive</NavLink>
          </div>

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <div
            className={`${
              isMenuOpen ? 'block' : 'hidden'
            } lg:flex lg:items-center lg:space-x-8 w-full lg:w-auto mt-4 lg:mt-0`}
          >
            <NavLinks />
          </div>

          {/* Search Bar */}
          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 pl-10"
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            />
            <svg
              className="h-5 w-5 text-gray-500 absolute left-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="hidden lg:flex space-x-8">
            <ProfileDropdown />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
