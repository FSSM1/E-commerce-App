import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ContactClient from "../src/pages/client/Contact";
import ContactSeller from "../src/pages/seller/Contact";

import HomeLayoutClient from "../src/pages/client/HomeLayout";
import HomeLayoutSeller from "../src/pages/seller/HomeLayout";

import LandingClient from "../src/pages/client/Landing";
import LandingSeller from "../src/pages/seller/Landing";

import ProductClient from "./pages/client/Products";
import ProductsSeller from "./pages/seller/Products";

import ErrorElement from "./components/ErrorElement";

import Signup from "./pages/Signup"
import Oneproduct from "./components/productsClient/Oneproduct";

const router = createBrowserRouter([
  {
    path: "/client",
    element: <HomeLayoutClient />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "Landing",
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
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "settings",
        element: <Settings />,
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
        path:'Products', 
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
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
