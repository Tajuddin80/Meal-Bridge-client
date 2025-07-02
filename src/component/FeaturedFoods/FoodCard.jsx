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
          className="card bg-base-100 shadow-xl rounded-2xl border border-base-300 hover:shadow-2xl transition-shadow"
        >
          <figure className="px-6 pt-6">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="rounded-xl object-cover w-full max-h-48"
            />
          </figure>
          <div className="card-body text-left text-base-content space-y-2">
            <h2 className="text-xl md:text-3xl font-extrabold text-primary">
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

            <div className="mt-4">
              <Link to={`/allfoods/${food._id}`}>
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
