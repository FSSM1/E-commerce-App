import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Contact from "./pages/client/Contact";
import HomeLayout from "./pages/client/HomeLayout";
import ErrorElement from "./components/ErrorElement";
import Landing from "./pages/client/Landing";
import Allproduct from "./components/productsClient/Allproduct"
import Signup from "./pages/client/Signup"
import Oneproduct from "./components/productsClient/Oneproduct"

const router = createBrowserRouter([
  {
    path: '/', 
    element: <HomeLayout />,
    errorElement: <ErrorElement/>, 
    children: [
      {
        path: 'home', 
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path:'products', 
        element: <Allproduct />,
        errorElement: <ErrorElement />,
      },
      {
        path:'contact', 
        element: <Contact />,
        errorElement: <ErrorElement />,
      },
      {
        path:'signup', 
        element: <Signup />,
        errorElement: <ErrorElement />,
      },
      { path: "products/:id",
         element: <Oneproduct />,
         errorElement: <ErrorElement /> }
    ]
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;