import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ContactClient from "../src/pages/client/Contact";
import ContactSeller from "../src/pages/seller/Contact";

import HomeLayoutClient from "../src/pages/client/HomeLayout";
import HomeLayoutSeller from "../src/pages/seller/HomeLayout";

import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";

import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import LandingClient from "../src/pages/client/Landing";
import LandingSeller from "../src/pages/client/Products";

import ProductClient from "./pages/client/Products";
import ProductsSeller from "./pages/seller/Products";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import ErrorElement from "./components/ErrorElement";
import Oneproduct from "./components/productsClient/Oneproduct";

import AboutClient from "./pages/client/About";
import AboutSeller from "./pages/seller/About";

const router = createBrowserRouter([
  {
    path: "/client",
    element: <HomeLayoutClient />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "home",
        element: <LandingClient />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <ProductClient />,
        errorElement: <ErrorElement />,
      },
      {
        path: "contact",
        element: <ContactClient />,
        errorElement: <ErrorElement />,
      },
      {
        path: "signup",
        element: <Signup />,
        errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:id",
        element: <Oneproduct />,
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorElement />,
      },
      {
        path: "about",
        element: <AboutClient />,
        errorElement: <ErrorElement />,
      },
    ],
  },

  {
    path: "/seller",
    element: <HomeLayoutSeller />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "home",
        element: <LandingSeller />,
        errorElement: <ErrorElement />,
      },
      {
        path: "Products",
        element: <ProductsSeller />,
        errorElement: <ErrorElement />,
      },
      {
        path: "contact",
        element: <ContactSeller />,
        errorElement: <ErrorElement />,
      },
      {
        path: "signup",
        element: <Signup />,
        errorElement: <ErrorElement />,
      },
      {
        path: "login",
        element: <Login />,
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "settings",
        element: <Settings />,
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorElement />,
      },
      {
        path: "about",
        element: <AboutSeller />,
        errorElement: <ErrorElement />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />;
    </CartProvider>
  );
};

export default App;
