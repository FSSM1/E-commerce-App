import React from "react";
import Navbar from "../../pages/seller/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {

  const user = JSON.parse(localStorage.getItem("user"))
  console.log("useridddd", user.id)
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <Outlet />
      <main className="container mx-auto"></main>
    </div>
  );
};

export default HomeLayout;
