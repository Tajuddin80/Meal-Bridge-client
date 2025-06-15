import React, { use, useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import { IoFastFoodOutline } from "react-icons/io5";

const Navbar = () => {
  const { user, handleLogout } = use(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = (e) => {
    const newTheme = e.target.checked ? "forest" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const links = (
    <>
      <li className="text-lg whitespace-nowrap">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          Home
        </NavLink>
      </li>
      <li className="text-lg whitespace-nowrap">
        <NavLink
          to="/availableFoods"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          Available Foods
        </NavLink>
      </li>
      <li className="text-lg whitespace-nowrap">
        <NavLink
          to="/addFood"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          Add Food
        </NavLink>
      </li>
      <li className="text-lg whitespace-nowrap">
        <NavLink
          to="/manageMyFoods"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          Manage My Foods
        </NavLink>
      </li>
      <li className="text-lg whitespace-nowrap">
        <NavLink
          to={`/myFoodRequest/${user?.email}`}
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          My Food Request
        </NavLink>
      </li>
      <li className="text-lg whitespace-nowrap">
        <NavLink
          to="/aboutUs"
          className={({ isActive }) => (isActive ? "underline font-bold" : "")}
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 z-50 sticky top-0 shadow-md  w-full max-w-full  px-4 md:px-10 lg:px-16">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>
        <div className=" md:flex items-center text-3xl font-semibold md:text-4xl">
          <span className="hidden md:flex">
            Meal <IoFastFoodOutline className="px-1" /> Bridge
          </span>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "forest"}
          />
          <svg
            className="swap-off h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-7 w-7 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" />
          </svg>
        </label>

        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
                data-tooltip-id="profile-tooltip"
                data-tooltip-content={
                  user?.displayName || user?.email || "User"
                }
              >
                <div className="w-10 rounded-full">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName || user?.email || "User profile"}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-50"
              >
                <li>
                  <Link
                    onClick={handleLogout}
                    to="/signin"
                    className="btn w-full"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
            <Tooltip id="profile-tooltip" />
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/signin" className="btn btn-outline btn-primary">
              Sign In
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
