import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar></Navbar>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer></Footer>
    </div>
  );
};

export default HomeLayout;
