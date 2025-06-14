import axios from "axios";
import React, { useEffect, useState } from "react";
import SignleFood from "./SignleFood";

const AvailableFood = () => {
  const [allFoods, setAllFoods] = useState([]);
  const [loading, setLoading] = useState(true);
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
  //   console.log(allFoods);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredFoods, setFilteredFoods] = useState([]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredFoods(allFoods);
    } else {
      const filtered = allFoods.filter(
        (food) =>
          food.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

      setFilteredFoods(filtered);
    }
  }, [selectedCategory, allFoods]);

  return (
    <div className="overflow-x-auto">
      {/* Filter Dropdown */}
      <div className="w-[95vw] mx-auto mt-10 mb-4 flex justify-end">
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
      </div>

      {/* Tips Table */}
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
            <div className="fixed inset-0 flex justify-center items-center bg-base-100/50 z-50">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            filteredFoods.map((food) => (
              <SignleFood key={food._id} food={food} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableFood;
