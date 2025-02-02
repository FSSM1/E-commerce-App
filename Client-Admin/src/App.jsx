import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomeLayout from "./pages/HomeLayout";

import ErrorElement from "./components/ErrorElement";
import Landing from "./pages/Landing";
import Products from "./pages/Products";
import UserProducts from "./components/users/UserProducts.jsx";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

import Signup from "./pages/SignUp.jsx";
import Login from "./pages/Login.jsx";

import Categories from "./pages/Categories";
import Settings from "./pages/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "home",
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "users",
        element: <Users />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
      },
      {
        path: "categories",
        element: <Categories />,
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />,
      },
      {
        path: "user-products/:id",
        element: <UserProducts />,
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

      // {
      //   path: 'products/:id',
      //   element: <SingleProduct />,
      //   errorElement: < ErrorElement />,

      // },
      // {
      //   path: 'cart',
      //   element: <Cart />
      // },
      // {
      //   path: 'about',
      //   element: <About />
      // },
      // {
      //   path: 'checkout',
      //   element: <Checkout />
      // },
      // {
      //   path: 'orders',
      //   element: <Orders />
      // },
    ],
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
    path: "*",
    element: <ErrorElement />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
