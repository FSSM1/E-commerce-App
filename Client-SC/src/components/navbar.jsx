
import { NavLink } from "react-router-dom";
import NavLinks from "./Navlinks";




const Navbar = () => {

   ///// we are getting "numItemsInCart" from cartSlice 


  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/* TITLE  */}
          <NavLink
            to="/"
            className="hidden lg:flex btn btn-primary text-3xl items-center"
          >
            c
          </NavLink>
          {/** DropDown */}
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />{" "}
          </ul>
        </div>
        <div className="navbar-end">
         
          <NavLink
            to="/contact"
            className="btn btn-ghost btn-circle btn-md ml-4"
          />
          <div className="indicator">
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
