import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Firebase/AuthContext/AuthContext";

import { PlusSquare, Utensils, HandHeart, ThumbsUp } from "lucide-react";
import { getIdToken } from "firebase/auth";
import { Link } from "react-router";
const Overview = () => {
  const { user } = useContext(AuthContext);
  const [allCount, setAllCount] = useState(0);
  const [myCount, setMyCount] = useState(0);
  const [totalFoods, setTotalFoods] = useState(0);
  const [requested, setRequested] = useState(0);

  useEffect(() => {
    // Fetch total reviews (public API)
    axios
      .get("https://meal-bridge-server-one.vercel.app/allreviews")
      .then((res) => setAllCount(res.data.length))
      .catch((err) => console.error("Failed to fetch reviews", err));
    axios
      .get("https://meal-bridge-server-one.vercel.app/allfoods")
      .then((res) => setTotalFoods(res.data.length))
      .catch((err) => console.error("Failed to fetch reviews", err));

    // Fetch my foods (private API)
    if (user) {
      getIdToken(user)
        .then((token) => {
          // Fetch my foods
          axios
            .get("https://meal-bridge-server-one.vercel.app/myfoods", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => setMyCount(res.data.length))
            .catch((err) => console.error("Failed to fetch my foods", err));

          // Fetch requested foods
          axios
            .get("https://meal-bridge-server-one.vercel.app/requestedFood", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              // You can create a separate state for requested food count
              setRequested(res.data.length);
              // Example:
              // setRequestedFoodCount(res.data.length);
            })
            .catch((err) =>
              console.error("Failed to fetch requested foods", err)
            );
        })
        .catch((err) => {
          console.error("Failed to get Firebase token", err);
        });
    }
  }, [user]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* My Foods */}
        <Link to={"/dashboard/manageMyFoods"}>
          <div className="card shadow-xl bg-base-200">
            <div className="card-body items-center text-center">
              <PlusSquare className="w-10 h-10 text-secondary" />
              <h3 className="card-title">My Foods</h3>
              <p className="text-3xl font-bold text-secondary">{myCount}</p>
              <p className="text-sm text-gray-500">Foods you’ve added</p>
            </div>
          </div>
        </Link>

        {/* Total Foods */}
        <Link to={"/availableFoods"}>
          <div className="card shadow-xl bg-base-200">
            <div className="card-body items-center text-center">
              <Utensils className="w-10 h-10 text-secondary" />
              <h3 className="card-title">Total Food Items</h3>
              <p className="text-3xl font-bold text-secondary">{totalFoods}</p>
              <p className="text-sm text-gray-500">All available Items</p>
            </div>
          </div>
        </Link>

        {/* My Requested Foods */}
        <Link to={"/dashboard/myFoodRequest"}>
          <div className="card shadow-xl bg-base-200">
            <div className="card-body items-center text-center">
              <HandHeart className="w-10 h-10 text-primary" />
              <h3 className="card-title">My Pending Request</h3>
              <p className="text-3xl font-bold text-primary">{requested}</p>
              <p className="text-sm text-gray-500">Your requested foods</p>
            </div>
          </div>
        </Link>

        {/* Recent Reviews */}

        <div className="card shadow-xl bg-base-200">
          <div className="card-body items-center text-center">
            <ThumbsUp className="w-10 h-10 text-primary" />
            <h3 className="card-title">Recent Reviews</h3>
            <p className="text-3xl font-bold text-primary">{allCount}</p>
            <p className="text-sm text-gray-500">Across all platform</p>
          </div>
        </div>

        {/* User Info */}
        <div className="card shadow-xl bg-base-200 col-span-full lg:col-span-1">
          <div className="card-body items-center text-center">
            <div className="avatar online mb-2">
              <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={user?.photoURL || "https://i.ibb.co/k6cvchkQ/male.jpg"}
                  alt="User Avatar"
                />
              </div>
            </div>
            <h3 className="card-title">{user?.displayName || "Anonymous"}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
