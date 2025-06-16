import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const FoodCard = ({ food, loading }) => {
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-base-100/50 z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="card bg-base-100 shadow-xl rounded-xl border border-base-300 hover:shadow-2xl transition-shadow"
        >
          <figure className="px-10 pt-10">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="rounded-xl object-cover w-full max-h-48"
            />
          </figure>
          <div className="card-body items-center text-center text-base-content">
            <h2 className="card-title text-2xl font-extrabold">
              {food.foodName}
            </h2>
            <p className="text-base font-semibold">
              Category: <span className="font-normal">{food.category}</span>
            </p>
            <p className="text-sm font-medium">
              Quantity: <span className="font-normal">{food.foodQuantity}</span>
            </p>
            <p className="text-sm font-medium">
              Pickup: <span className="font-normal">{food.pickupLocation}</span>
            </p>
            <p className="text-sm font-semibold text-error">
              Expires: <span className="font-normal">{food.expiredDate}</span>
            </p>

            <div className="w-full mt-4">
              <Link to={`/allfoods/${food._id}`} className="w-full">
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
