import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
// import { myAddedFoodsPromies } from "../../api/foodsApi";
import MyAddedSignleFood from "../../component/MyAddedSignleFood/MyAddedSignleFood";
import { fetchFoods } from "../../api/fetchFoods";

const ManageMyFoods = () => {
  const { user } = use(AuthContext);
  const email = user?.email;

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true); // added loading state
useEffect(() => {
  const fetchMyFoods = async () => {
    if (email) {
      setLoading(true);
      try {
        const addedFoods = await fetchFoods({ email });
        setFoods(addedFoods);
      } catch (error) {
        console.error("Failed to fetch foods", error);
      } finally {
        setLoading(false);
      }
    }
  };

  fetchMyFoods();
}, [email]);

  return (
    <div>
      <h2 className=" text-3xl md:text-5xl my-20 text-center font-bold "> My Added Foods</h2>
      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-base-100/50 z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <table className="w-[95vw] my-4 mx-auto bg-base-50 border border-base-300 rounded-lg shadow-sm text-base-content">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Quantity</th>
              <th className="py-3 px-4 text-left">Expiration Date</th>
              <th className="py-3 px-4 text-left">Pickup Location</th>
              <th className="py-3 px-4 text-left">Edit</th>
              <th className="py-3 px-4 text-left">Delete</th>
              <th className="py-3 px-4 text-left">View Details</th>
            </tr>
          </thead>
          <tbody>
            {foods.length > 0 ? (
              foods.map((food) => (
                <MyAddedSignleFood key={food._id} food={food} />
              ))
            ) : (
           <tr>
  <td colSpan="9" className="py-8 text-center bg-base-400 rounded-lg">
    <div className="flex flex-col items-center justify-center space-y-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 text-base-content/50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0l-8 8-8-8m16 0H4" />
      </svg>
      <p className="text-lg font-semibold text-base-content/70">No foods added yet</p>
      <p className="text-sm text-base-content/50">Start adding delicious items to fill this table!</p>
    </div>
  </td>
</tr>

            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageMyFoods;
