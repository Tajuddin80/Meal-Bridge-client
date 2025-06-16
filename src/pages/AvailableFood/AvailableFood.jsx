
import axios from "axios";
import React, { useEffect, useState } from "react";
import SignleFood from "./SignleFood";

const AvailableFood = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/allfoods")
      .then((res) => {
        setAllFoods(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let updatedFoods = [...allFoods];

    // Apply category filter
    if (selectedCategory !== "all") {
      updatedFoods = updatedFoods.filter(
        (food) =>
          food.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply expiration date sort
    if (sortOrder !== "none") {
      updatedFoods.sort((a, b) => {
        const dateA = new Date(a.expiredDate);
        const dateB = new Date(b.expiredDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    setFilteredFoods(updatedFoods);
  }, [selectedCategory, sortOrder, allFoods]);

  return (
    <div className="overflow-x-auto">
      {/* Filter & Sort Controls */}
      <div className="w-[95vw] mx-auto mt-10 mb-4 flex flex-wrap justify-center gap-4">
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
      </div>

      {/* Table */}
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
          {loading ? (
            <tr>
              <td colSpan="7">
                <div className="flex justify-center items-center py-10">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              </td>
            </tr>
          ) : filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <SignleFood key={food._id} food={food} />
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center py-6">
                No food found for selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableFood;
