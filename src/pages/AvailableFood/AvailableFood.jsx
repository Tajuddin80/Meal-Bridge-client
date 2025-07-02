import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import { Helmet } from "react-helmet";
import { Grid, List } from "lucide-react";
import { motion } from "framer-motion";

const fetchFoods = async () => {
  const { data } = await axios.get(
    "https://meal-bridge-server-one.vercel.app/allfoods"
  );
  return data;
};

const AvailableFood = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  const getSavedState = (key, defaultValue) => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [viewType, setViewType] = useState(() =>
    getSavedState("availableFood_viewType", "card")
  );
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");

  useEffect(() => {
    localStorage.setItem("availableFood_viewType", JSON.stringify(viewType));
  }, [viewType]);

  const {
    data: allFoods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allFoods"],
    queryFn: fetchFoods,
  });

  const addFoodMutation = useMutation({
    mutationFn: async (newFood) => {
      const token = await user.getIdToken();
      return axios.post(
        "https://meal-bridge-server-one.vercel.app/addfood",
        newFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allFoods"]);
      Swal.fire({
        icon: "success",
        title: "Demo food added",
        text: "Check at the end of this page",
      });
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Failed to add sample food",
        text: err.response?.data?.message || "Unknown error",
        toast: true,
        timer: 2500,
        showConfirmButton: false,
      });
    },
  });

  const handleAddFood = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to add food",
        toast: true,
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    const newFood = {
      foodName: "Test Soup added using tanstack",
      foodImage: "https://i.ibb.co/xKxr4JKD/soup2.jpg",
      foodQuantity: 20,
      pickupLocation: "Banani, Dhaka",
      expiredDate: new Date().toISOString().split("T")[0],
      additionalNotes: "Delicious and fresh",
      foodStatus: "available",
      category: "Appetizer",
      donor: {
        donorImage: user?.photoURL || "",
        donorName: user?.displayName || "Anonymous",
        donorEmail: user?.email || "",
      },
    };

    addFoodMutation.mutate(newFood);
  };

  const filteredFoods = allFoods
    .filter((food) =>
      selectedCategory === "all"
        ? true
        : food.category?.toLowerCase() === selectedCategory.toLowerCase()
    )
    .filter((food) =>
      food.foodName.toLowerCase().includes(searchText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "none") return 0;
      const dateA = new Date(a.expiredDate).getTime();
      const dateB = new Date(b.expiredDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  if (isError) {
    return (
      <div className="text-center text-error py-10">
        Error loading foods: {error.message}
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Meal Bridge || Available Food</title>
      </Helmet>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 items-center my-6 px-4">
        <input
          type="text"
          placeholder="Search by food name..."
          className="input input-bordered w-full max-w-xs"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All Category</option>
          <option value="Main-Course">Main Course</option>
          <option value="Dessert">Dessert</option>
          <option value="Side-Dish">Side Dish</option>
          <option value="Street-Food">Street Food</option>
          <option value="Appetizer">Appetizer</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="select select-bordered"
        >
          <option value="none">Sort by Expiration</option>
          <option value="asc">Oldest First</option>
          <option value="desc">Newest First</option>
        </select>

        <button
          onClick={() =>
            setViewType((prev) => {
              const newType = prev === "card" ? "table" : "card";
              localStorage.setItem(
                "availableFood_viewType",
                JSON.stringify(newType)
              );
              return newType;
            })
          }
          className="btn btn-sm btn-outline flex gap-1"
        >
          {viewType === "card" ? (
            <>
              <List size={16} /> Table View
            </>
          ) : (
            <>
              <Grid size={16} /> Card View
            </>
          )}
        </button>

        <button
          className="btn btn-success"
          onClick={handleAddFood}
          disabled={addFoodMutation.isLoading}
        >
          {addFoodMutation.isLoading ? "Adding..." : "Add Sample Food"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center py-6">
          No food found for selected filters.
        </div>
      ) : viewType === "card" ? (
          <div className="grid gap-4 w-[95vw] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {filteredFoods.map((food) => (
        <motion.div
          key={food._id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="card bg-base-100 border border-base-300 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow"
        >
          <figure className="px-6 pt-6">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="rounded-xl object-cover w-full max-h-48"
            />
          </figure>

          <div className="card-body text-left text-base-content space-y-2">
            <h3 className="text-xl md:text-3xl font-extrabold text-primary">
              {food.foodName}
            </h3>
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
              <Link
                to={`/allFoods/${food._id}`}
                className="btn btn-md btn-outline btn-primary w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
      ) : (
        <div className="overflow-x-auto w-[95vw] mx-auto">
          <table className="table bg-base-200 shadow rounded text-lg">
            <thead className="bg-primary  text-primary-content">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiration</th>
                <th>Pickup</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.map((food) => (
                <tr key={food._id} className="hover">
                  <td>
                    <img
                      src={food.foodImage}
                      alt={food.foodName}
                      className="h-20 w-20 rounded object-cover"
                    />
                  </td>

                  <td>{food.foodName}</td>
                  <td>{food.category}</td>
                  <td>{food.foodQuantity}</td>
                  <td>{food.expiredDate}</td>
                  <td>{food.pickupLocation}</td>
                  <td>
                    <Link
                      to={`/allFoods/${food._id}`}
                      className="btn btn-md btn-outline btn-info"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AvailableFood;
