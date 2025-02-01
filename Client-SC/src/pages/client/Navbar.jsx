import { NavLink } from "react-router-dom";
import NavLinks from "../client/NavLinks";
import ProfileDropdown from "../ProfileDropdown";
import { useContext, useState } from "react";
import { SearchContext } from "../../components/productsClient/SearchContext";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { setSearchTerm } = useContext(SearchContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu visibility

  const { totalItems } = useCart();

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
              isMenuOpen ? "block" : "hidden"
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
          {/* Cart Icon */}
          <div className="hidden lg:flex space-x-8">
            <NavLink to="/client/cart" className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {totalItems} {/* Display total items in the cart */}
              </span>
            </NavLink>
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
