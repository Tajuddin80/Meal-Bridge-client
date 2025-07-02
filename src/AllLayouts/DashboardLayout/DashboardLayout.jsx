import React, { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router";
import {
  Home,
  UtensilsCrossed,
  ClipboardList,
  HandPlatter,
} from "lucide-react";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import Navbar from "../../component/Navbar/Navbar";
import Footer from "../../component/Footer/Footer";

const DashboardLayout = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
const isActive = (path) => location.pathname === path || location.pathname === `/dashboard/${path}`;


  return (
    <>
      <Navbar />

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10 p-4 sm:p-6 lg:p-10 bg-base-200 rounded-2xl mb-6 lg:mb-10 text-base-content">
        {/* Sidebar */}
        <aside className="w-full lg:w-[20%] bg-base-100 py-6 sm:py-10 px-4 shadow-xl rounded-2xl mb-4 lg:mb-0">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4 sm:mb-6 text-center">
            Dashboard
          </h2>
          <ul className="menu space-y-2 text-sm sm:text-base">
            <li>
              <Link
                to="/dashboard"

                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("/dashboard")
                    ? "bg-primary text-black"
                    : "hover:bg-primary hover:text-black"
                }`}
              >
                <Home size={18} /> Overview
              </Link>
            </li>

            <li>
            <Link
  to="addFood"
  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
    isActive("addFood")
      ? "bg-primary text-black"
      : "hover:bg-primary hover:text-black"
  }`}
>
  <UtensilsCrossed size={18} /> Add Food
</Link>

            </li>

            <li>
              <Link
                to="manageMyFoods"
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("manageMyFoods")
                    ? "bg-primary text-black"
                    : "hover:bg-primary hover:text-black"
                }`}
              >
                <ClipboardList size={18} /> Manage Food
              </Link>
            </li>

            <li>
              <Link
                to="myFoodRequest"
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive("myFoodRequest")
                    ? "bg-primary text-black"
                    : "hover:bg-primary hover:text-black"
                }`}
              >
                <HandPlatter size={18} /> Request Food
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1 p-3 sm:p-6 lg:p-8 bg-base-100 rounded-2xl">
          <div className="w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default DashboardLayout;
