import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Contact from "./pages/Contact";
import HomeLayout from "./pages/HomeLayout"

import ErrorElement from "./components/ErrorElement";
import Landing from "./pages/Landing";


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
        path:'contact', 
        element: <Contact />,
        errorElement: < ErrorElement />,
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
    ]
  },
  // {
  //   path: '/login', 
  //   element: <Login />,
  //   errorElement: <Error/>, 
  //   action: loginAction(store), 
  // },
  // {
  //   path: '/register', 
  //   element: <Register />,
  //   errorElement: <Error/>, 
  //   action: registerAction, 
  // },
  
])

const App = () => {
  return <RouterProvider router={router} />
};

export default App;
