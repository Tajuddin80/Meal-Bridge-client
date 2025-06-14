import React from "react";
import { Link } from "react-router";
import ErrorPng from "../../assets/404.webp";

const Error404 = () => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-screen-sm sm:text-center sm:mx-auto">
        <Link
          to="/"
          aria-label="View"
          className="inline-block mb-5 rounded-full sm:mx-auto text-center"
        >
          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
            <svg
              className="w-12 h-12 text-deep-purple-accent-400"
              stroke="currentColor"
              viewBox="0 0 52 52"
            >
              <polygon
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                points="29 13 14 29 25 29 23 39 38 23 27 23"
              />
            </svg>
          </div>
        </Link>
        <h2 className="mb-4 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
          <img className="rounded-lg" src={ErrorPng} alt="404" />
        </h2>
        <p className="text-base text-gray-700 md:text-lg sm:px-4 text-center">
          <Link
            to="/"
            className="text-center px-5 py-2.5 relative rounded group overflow-hidden font-medium bg-purple-50 text-purple-600 inline-block"
          >
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white">Go to Home</span>
          </Link>
        </p>
        <hr className="w-full my-8 border-gray-300" />
      </div>
    </div>
  );
};

export default Error404;