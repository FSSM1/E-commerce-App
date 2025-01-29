import React from 'react'
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const navbar = () => {
  return (
    <nav className="bg-base-200">
  <div className="navbar align-element flex justify-between items-center">
    {/* Navbar Start */}
    <div className="navbar-start">
      <NavLink to="/" className="hidden lg:flex btn btn-primary text-3xl items-center">
        c
      </NavLink>
    </div>

    {/* Navbar Center (Menu Links) */}
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal flex space-x-4">
        <NavLinks />
      </ul>
    </div>

    {/* Navbar End (Buttons) */}
    <div className="navbar-end flex items-center space-x-4">
      <NavLink to="/products" className="btn btn-ghost btn-circle btn-md" />
      <NavLink to="/users" className="btn btn-ghost btn-circle btn-md" />
      <NavLink to="/profile" className="btn btn-ghost btn-circle btn-md" />
      <div className="indicator"></div>
    </div>
  </div>
</nav>

  
  );
}

export default navbar