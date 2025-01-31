import React from 'react'
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-md">
  <div className="navbar container mx-auto px-4 py-3 flex justify-between items-center">
    {/* Navbar Start */}
    <div className="navbar-start">
      <NavLink to="/" className="hidden lg:flex btn btn-primary text-3xl items-center px-4 py-2">
        c
      </NavLink>
    </div>

    {/* Navbar Center (Menu Links) */}
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal flex space-x-6">
        <NavLinks />
      </ul>
    </div>

    {/* Navbar End (Buttons) */}
    <div className="navbar-end flex items-center space-x-6">
      <NavLink to="/products" className="btn btn-outline btn-circle btn-lg text-lg border-gray-500 hover:bg-gray-700" />
      <NavLink to="/users" className="btn btn-outline btn-circle btn-lg text-lg border-gray-500 hover:bg-gray-700" />
      <NavLink to="/profile" className="btn btn-outline btn-circle btn-lg text-lg border-gray-500 hover:bg-gray-700" />
      <div className="indicator"></div>
    </div>
  </div>
</nav>


  
  );
}

export default navbar