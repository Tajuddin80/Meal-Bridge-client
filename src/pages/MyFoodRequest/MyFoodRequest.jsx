import React, { useEffect, useState, useContext } from "react";
import MyFoodRequestSingleCard from "./MyFoodRequestSingleCard";
import { myRequestedFoodsPromise } from "../../api/myRequestedFoodsPromise";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

const MyFoodRequest = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.accessToken) {
      setLoading(true);
      myRequestedFoodsPromise(user.accessToken)
        .then((foods) => {
          setAllFoods(foods);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch requested foods:", err);
          setLoading(false);
        });
    }
  }, [user?.accessToken]);

  const handleRemoveFood = (id) => {
    setAllFoods((prev) => prev.filter((food) => food._id !== id));
  };

  return (
    <>
      <Helmet>
        <title>Meal Bridge || My Food Request</title>
      </Helmet>
      <h3 className="text-center text-2xl  md:text-3xl lg:text-4xl">
        My Requested Foods Section
      </h3>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : allFoods.length === 0 ? (
        <div className="text-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 text-base-content/50 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-8 8-8-8m16 0H4"
            />
          </svg>
          <p className="text-lg font-semibold text-base-content/70">
            No foods are requested yet
          </p>
          <p className="text-sm text-base-content/50">
            You can Request or Donate some Food
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  mx-auto my-6">
          {allFoods.map((food) => (
            <MyFoodRequestSingleCard
              key={food._id}
              food={food}
              onRemove={handleRemoveFood}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyFoodRequest;
