import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import SignleFood from "./SignleFood";
import FoodCard from "../../component/FeaturedFoods/FoodCard";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const fetchFoods = async () => {
  const { data } = await axios.get("http://localhost:3000/allfoods");
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

  const [selectedCategory, setSelectedCategory] = useState(() =>
    getSavedState("availableFood_category", "all")
  );
  const [sortOrder, setSortOrder] = useState(() =>
    getSavedState("availableFood_sortOrder", "none")
  );
  const [viewType, setViewType] = useState(() =>
    getSavedState("availableFood_viewType", "table")
  );
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    localStorage.setItem("availableFood_category", JSON.stringify(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("availableFood_sortOrder", JSON.stringify(sortOrder));
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem("availableFood_viewType", JSON.stringify(viewType));
  }, [viewType]);

  const { data: allFoods = [], isLoading, isError, error } = useQuery({
    queryKey: ["allFoods"],
    queryFn: fetchFoods,
  });

  const addFoodMutation = useMutation({
    mutationFn: (newFood) => axios.post("http://localhost:3000/addfood", newFood),
    onSuccess: () => {
      queryClient.invalidateQueries(["allFoods"]);
      Swal.fire({
        icon: "success",
        title: "Demo food added",
        text: "Check at the end of this page",
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add sample food",
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

  const filteredFoods = allFoods
    .filter((food) =>
      selectedCategory === "all" ? true :
        food.category?.toLowerCase() === selectedCategory.toLowerCase()
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
    return <div className="text-center text-error py-10">Error loading foods: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
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

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : filteredFoods.length === 0 ? (
        <div className="text-center py-6">No food found for selected filters.</div>
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
