import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Contact from "./pages/Contact";
import HomeLayout from "./pages/HomeLayout";
import ErrorElement from "./components/ErrorElement";
import Landing from "./pages/Landing";
import Allproduct from "./components/products/Allproduct"
import Signup from "./pages/Signup"

const router = createBrowserRouter([
  {
    path: '/client', 
    element: <HomeLayout />,
    errorElement: <ErrorElement/>, 
    children: [
      {
        path: 'Landing', 
        element: <LandingClient />,
        errorElement: <ErrorElement />,
      },
      {
        path:'products', 
        element: <ProductClient />,
        errorElement: <ErrorElement />,
      },
      {
        path:'contact', 
        element: <ContactClient />,
        errorElement: <ErrorElement />,
      },
      {
        path:'signup', 
        element: <Signup />,
        errorElement: <ErrorElement />,
      },
      {
        path:'login', 
        element: <Login />,
        errorElement: <ErrorElement />,
      },
    ]
  },

  {
    path: '/seller', 
    element: <HomeLayout />,
    errorElement: <ErrorElement/>, 
    children: [
      {
        path: 'home', 
        element: <LandingSeller />,
        errorElement: <ErrorElement />,
      },
      {
        path:'products', 
        element: <ProductsSeller />,
        errorElement: <ErrorElement />,
      },
      {
        path:'contact', 
        element: <ContactSeller />,
        errorElement: <ErrorElement />,
      },
      {
        path:'signup', 
        element: <Signup />,
        errorElement: <ErrorElement />,
      },
    ]
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;