import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import SignleFood from "./SignleFood";
import FoodCard from "../../component/FeaturedFoods/FoodCard";

// Assume you have a UserContext or AuthContext providing current user info
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const fetchFoods = async () => {
  const { data } = await axios.get("http://localhost:3000/allfoods");
  return data;
};

const AvailableFood = () => {
  const queryClient = useQueryClient();
  const { user } = useContext(AuthContext);

  console.log(user);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [searchText, setSearchText] = useState("");
  const [viewType, setViewType] = useState("table");

  // Fetch foods using TanStack Query
  const {
    data: allFoods = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allFoods"],
    queryFn: fetchFoods,
  });

  // Mutation for adding new food
  const addFoodMutation = useMutation({
    mutationFn: (newFood) =>
      axios.post("http://localhost:3000/addfood", newFood),
    onSuccess: () => {
      queryClient.invalidateQueries(["allFoods"]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Demo food added, check at the end of this page",
        showConfirmButton: true,
        // timer: 1500
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add sample food. Please try again.",
        position: "top-end",
        toast: true,
        timer: 2500,
        showConfirmButton: false,
      });
    },
  });

  // Handler to add demo food
  const handleAddFood = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to add food.",
        position: "top-end",
        toast: true,
        timer: 2500,
        showConfirmButton: false,
      });
      return;
    }

    const newFood = {
      foodName: "Test Soup",
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

  // Filter, sort, and search combined logic
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
      const dateA = new Date(a.expiredDate).getTime() || 0;
      const dateB = new Date(b.expiredDate).getTime() || 0;
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
    <div className="overflow-x-auto">
      {/* Filters and Controls */}
      <div className="w-[95vw] mx-auto mt-10 mb-4 flex flex-wrap justify-center gap-4">
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

        <select
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          className="select select-bordered"
        >
          <option value="table">Table View</option>
          <option value="card">Card View</option>
        </select>

        <button
          className="btn btn-success"
          onClick={handleAddFood}
          disabled={addFoodMutation.isLoading}
        >
          {addFoodMutation.isLoading ? "Adding..." : "Add Sample Food"}
        </button>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center py-6">
          No food found for selected filters.
        </div>
      ) : viewType === "table" ? (
        <table className="w-[95vw] my-4 mx-auto bg-base-50 border border-base-300 rounded-lg shadow-sm text-base-content">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Expiration Date</th>
              <th className="py-3 px-4 text-left">Pickup Location</th>
              <th className="py-3 px-4 text-left">View Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredFoods.map((food) => (
              <SignleFood key={food._id} food={food} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="grid gap-8 w-[95vw] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-8">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} loading={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableFood;
