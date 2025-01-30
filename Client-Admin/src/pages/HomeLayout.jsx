import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import axios from "axios";


function HomeLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const navigate = useNavigate();



  useEffect(() => {
    const checkAuthentication = async () => {
      let token = localStorage.getItem("accessToken");

      if (!token) {
        // No access token, try refreshing
        token = await refreshToken();
        if (!token) {
          setIsAuthenticated(false);
          navigate("/login"); // Redirect if refreshing fails
          return;
        }
      }

      // Verify the token with a test request
      try {
        await axios.get("http://localhost:3000/api/users/verify"); // Endpoint to check token validity
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Invalid token, logging out.");
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Prevent rendering layout if not authenticated
  }

  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
