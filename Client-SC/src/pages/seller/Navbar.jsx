import { NavLink } from "react-router-dom";
import NavLinks from "../seller/NavLinks";
import ProfileDropdown from "../ProfileDropdown";

const Navbar = () => {
  return (
    <>
      <div className="bg-black text-white py-2">
        <div className="container mx-auto flex justify-end px-4">
          <select className="bg-black text-white border-none focus:outline-none">
            <option>English</option>
            <option>Other Language</option>
          </select>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <NavLink to="/">Exclusive</NavLink>
          </div>

          <div className="hidden lg:flex space-x-8">
            <NavLinks />
          </div>

          <div className="flex items-center relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border border-gray-300 rounded-lg px-4 py-2 w-64 pl-10" // Add padding for the icon
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
