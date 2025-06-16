import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const MealBridgeBanner = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden rounded-lg shadow-lg mb-15">
      {/* Background Image */}
      <img
        src="https://i.ibb.co/v4D29MV6/top-view-tasty-cooked-potatoes-delicious-meal-with-greens-seasonings-dark-surface-potato-dinner-dish.jpg"
        alt="MealBridge Community Event"
        className="absolute w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6 md:px-12">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold"
        >
          Welcome to <span className="text-primary">Meal </span>
          <span className="text-secondary">Bridge</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-sm sm:text-base md:text-lg max-w-2xl text-white/85"
        >
          Share surplus meals, reduce food waste, and connect with your local
          community to make a positive impact today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 flex gap-4 flex-wrap justify-center"
        >
          <Link to="/availableFoods" className="btn btn-primary">
            Explore Foods
          </Link>
          <Link to="/addFood" className="btn btn-secondary">
            Share Food
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default MealBridgeBanner;
