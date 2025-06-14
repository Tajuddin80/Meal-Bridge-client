import { motion } from "framer-motion";
import { Link } from "react-router";
import React from "react";

const FoodCard = ({ food, loading }) => {
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-base-100/50 z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="card bg-base-200 shadow-lg rounded-xl"
        >
          <figure className="px-10 pt-10">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold">{food.foodName}</h2>
            <p className="text-lg text-gray-600">Category: {food.category}</p>
            <p className="text-sm">Quantity: {food.foodQuantity}</p>
            <p className="text-sm">Pickup: {food.pickupLocation}</p>
            <p className="text-sm text-red-500">Expires: {food.expiredDate}</p>

            <div className="w-full mt-4">
              <Link to={`/food/${food._id}`} className="w-full">
                <button className="btn btn-primary w-full">View Details</button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default FoodCard;
