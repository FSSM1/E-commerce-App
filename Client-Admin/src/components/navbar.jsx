import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [searchType, setSearchType] = useState("products"); // Default search type
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for ${searchType}: ${searchQuery}`);
    // Implement navigation or API call for search results here
    
  };

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

        {/* Search Bar */}
        {/* <form className="flex items-center space-x-2" onSubmit={handleSearch}>
          <select
            className="select select-bordered"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="products">Products</option>
            <option value="users">Users</option>
          </select>
          <input
            type="text"
            placeholder={`Search ${searchType}...`}
            className="input input-bordered w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </form> */}

        {/* Navbar End (Buttons) */}
        <div className="navbar-end flex items-center space-x-4">
          <NavLink to="/products" className="btn btn-ghost btn-circle btn-md" />
          <NavLink to="/users" className="btn btn-ghost btn-circle btn-md" />
          <NavLink to="/profile" className="btn btn-ghost btn-circle btn-md" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
  