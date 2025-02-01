import { NavLink } from "react-router-dom";

const links = [
  { id: 1, url: "/client/home", text: "Home" },
  { id: 2, url: "/client/products", text: "Products" },
  { id: 3, url: "/client/contact", text: "Contact" },
  { id: 4, url: "/client/about", text: "About" },
  { id: 5, url: "/client/signup", text: "Sign Up" },
  
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
