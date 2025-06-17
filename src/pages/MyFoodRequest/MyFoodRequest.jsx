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
      <h3 className="text-center text-2xl my-10 md:text-3xl lg:text-4xl">
        My Requested Foods Section
      </h3>
      <div className="overflow-x-auto">
        <table className="table w-[95vw] my-4 mx-auto bg-base-50 border border-base-300 rounded-lg shadow-sm text-base-content">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="py-3 px-4 w-20 text-center">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-center">Quantity Requested</th>
              <th className="py-3 px-4 text-center">Expiration Date</th>
              <th className="py-3 px-4 text-left">Pickup Location</th>
              <th className="py-3 px-4 text-center">View Details</th>
              <th className="py-3 px-4 w-36 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-10">
                  <span className="loading loading-spinner loading-lg"></span>
                </td>
              </tr>
            ) : allFoods.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="py-8 text-center bg-base-400 rounded-lg"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-base-content/50"
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
                </td>
              </tr>
            ) : (
              allFoods.map((food) => (
                <MyFoodRequestSingleCard
                  key={food._id}
                  food={food}
                  onRemove={handleRemoveFood}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyFoodRequest;
