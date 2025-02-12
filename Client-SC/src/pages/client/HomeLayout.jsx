import React from "react";
import Navbar from "../../pages/client/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />
      <Outlet />
      <main className="container mx-auto"></main>
    </div>
  );
};

export default HomeLayout;
