import React from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import ProfileDropdown from "../pages/ProfileDropdown";

const Navbar = () => {
  return (
    <nav className="bg-base-200 shadow-md">
      <div className="navbar container mx-auto flex justify-between items-center py-4 px-6">
        {/* Navbar Start */}
        <div className="navbar-start">
        <div className="text-2xl font-bold">
            <NavLink to="/">Exclusive</NavLink>
          </div>
        </div>

        {/* Navbar Center (Menu Links) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal flex space-x-6">
            <NavLinks />
          </ul>
        </div>

        <div className="hidden lg:flex space-x-8">
          <ProfileDropdown />
        </div>

        {/* Navbar End (Buttons) */}
        <div className="navbar-end flex items-center space-x-4">
          <NavLink
            to="/products"
            className="btn btn-ghost btn-circle btn-md hover:bg-gray-300"
          />
          <NavLink
            to="/users"
            className="btn btn-ghost btn-circle btn-md hover:bg-gray-300"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
