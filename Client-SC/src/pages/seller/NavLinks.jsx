import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/seller/home", text: "Home" },
  { id: 2, url: "/seller/products", text: "Products" },
  { id: 3, url: "/seller/contact", text: "Contact" },
  { id: 4, url: "/seller/about", text: "About" },
  { id: 5, url: "/seller/signup", text: "Sign Up" },

];

const NavLinks = () => {
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;
        return (
          <NavLink
            key={id}
            to={url}
            className="text-gray-700 hover:text-gray-900"
          >
            {text}
          </NavLink>
        );
      })}
    </>
  );
};

export default NavLinks;