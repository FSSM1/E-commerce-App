
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Contact from "./pages/Contact";
import HomeLayout from "./pages/HomeLayout";
import ErrorElement from "./components/ErrorElement";
import Landing from "./pages/Landing";
import Allproduct from "./components/products/Allproduct"
import Signup from "./pages/Signup"

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
    ]
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;