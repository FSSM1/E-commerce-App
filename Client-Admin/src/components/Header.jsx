import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-black py-2 text-white">
      <div className="flex justify-center sm:justify-end items-center">
        {user ? (
          <div className="flex gap-x-2 sm:gap-x-8 items-center">
            <p className="text-xs sm:text-sm">Hello, {user.firstname}</p>
            <button
              className="btn btn-xs bg-red-500 text-white hover:bg-red-600 transition duration-300 ease-in-out rounded-lg px-4 py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-x-6 justify-center items-center pl-20">
            <Link
              to="/login"
              className="link link-hover text-xs sm:text-sm text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out"
            >
              Log in
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
