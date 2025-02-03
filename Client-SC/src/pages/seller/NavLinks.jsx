import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/seller/home", text: "Home" },
  { id: 2, url: "/seller/products", text: "My Products" },
  { id: 3, url: "/seller/contact", text: "Contact" },
  { id: 4, url: "/seller/about", text: "About" },
];

const NavLinks = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {links.map((link) => {
              const { id, url, text } = link;
              return (
                <div key={id} className="inline-block">
                  <NavLink to={url} className="text-gray-700 hover:text-gray-900">
                    {text}
                  </NavLink>
                </div>
              );
            })}
      
            {/* Separate NavLink for Sign Up */}
            {!user ? (
              <NavLink
                key="5"
                to="/client/signup"
                className="text-gray-700 hover:text-gray-900"
              >
                Sign Up
              </NavLink>
            ) : (
              <div></div> // Optional: you can remove this div if you don't need it
            )}
            {!user ? (
        <NavLink
          key="5"
          to="/seller/login"
          className="text-gray-700 hover:text-gray-900"
        >
          Login
        </NavLink>
      ) : (
        <div></div> // Optional: you can remove this div if you don't need it
      )}
          </>
        );
};

export default NavLinks;
