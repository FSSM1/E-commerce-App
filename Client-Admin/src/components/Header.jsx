
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";



const Header = () => {

  const [user, setuser] = useState(false);
  /// cartState and userState you can find the m in the utils/store.js

  return (
    <header className="bg-neutral py-2 text-neutral-centent">
      <div className="align-element flex justify-center sm:justify-end">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user?.username}</p>
            <button className="btn btn-xs btn-outline btn-primary" onClick={()=>{}}></button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center">
            <Link to="/login" className="link link-hover text-xs sm:text-sm">
              Log in 
            </Link>

            <Link to="/signup" className="link link-hover text-xs sm:text-sm">
              Create Account
            </Link>
          </div>
        )}
        {/*  USER */}
        {/*  Links */}
      </div>
    </header>
  );
};

export default Header;
