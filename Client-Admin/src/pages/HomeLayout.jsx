import React from "react";
import Navbar from "../components/navbar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";


function HomeLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default HomeLayout;
