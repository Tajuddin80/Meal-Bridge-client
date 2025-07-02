import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { fetchMyFoodsApi } from "../../api/fetchMyFoodsApi";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import { Pencil, Trash2, Grid, List } from "lucide-react";

const ManageMyFoods = () => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("card");

  // Load view mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("myFoodsViewMode");
    if (savedMode) {
      setViewMode(savedMode);
    }
  }, []);

  // Fetch foods
  useEffect(() => {
    const fetchMyFoods = async () => {
      if (user) {
        setLoading(true);
        try {
          const token = await user.getIdToken();
          const addedFoods = await fetchMyFoodsApi(token);
          setFoods(addedFoods);
        } catch (error) {
          console.error("Failed to fetch foods", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchMyFoods();
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (!user) {
            Swal.fire("Not authenticated!", "Please login first.", "error");
            return;
          }

          const token = await user.getIdToken();
          const response = await fetch(
            `https://meal-bridge-server-one.vercel.app/allfoods/${id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await response.json();
          if (response.ok && data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your food has been deleted.", "success");
            setFoods((prev) => prev.filter((f) => f._id !== id));
          } else {
            Swal.fire("Error!", data.message || "Deletion failed.", "error");
          }
        } catch (error) {
          console.error("Delete error:", error);
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  const toggleViewMode = () => {
    const newMode = viewMode === "card" ? "table" : "card";
    setViewMode(newMode);
    localStorage.setItem("myFoodsViewMode", newMode);
  };

  return (
    <div>
      <Helmet>
        <title>Meal Bridge || Manage Food</title>
      </Helmet>

         <h3 className="text-center text-2xl  md:text-3xl lg:text-4xl">
       Manage my Foods
      </h3>
      <div className="flex justify-between items-center my-6 px-4">
        <button onClick={toggleViewMode} className="btn btn-sm btn-outline flex gap-1">
          {viewMode === "card" ? (
            <>
              <List size={16} /> Table View
            </>
          ) : (
            <>
              <Grid size={16} /> Card View
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="fixed inset-0 flex justify-center items-center bg-base-100/50 z-50">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : foods.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-base-content/70">No foods added yet.</p>
          <p className="text-sm text-base-content/50">Start adding items to see them here.</p>
        </div>
      ) : viewMode === "card" ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {foods.map((food) => (
    <div
      key={food._id}
      className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
    >
      <figure className="relative">
        <img
          src={food.foodImage}
          alt={food.foodName}
          className="h-48 w-full object-cover transition duration-500 hover:brightness-110"
        />
        <span className="absolute top-2 left-2 bg-primary text-primary-content text-xs font-semibold px-2 py-1 rounded animate-pulse">
          {food.category}
        </span>
      </figure>

      <div className="card-body p-4 space-y-1">
        <h3 className="card-title text-lg font-bold transition-colors duration-300 hover:text-primary">
          {food.foodName}
        </h3>
        <p className="text-sm text-base-content/70">
          Quantity: <span className="font-semibold">{food.foodQuantity}</span>
        </p>
        <p className="text-sm text-base-content/70">
          Expires: <span className="font-semibold">{food.expiredDate}</span>
        </p>
        <p className="text-sm text-base-content/70">
          Pickup: <span className="font-semibold">{food.pickupLocation}</span>
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          <Link
            to={`/updateFood/${food._id}`}
            className="btn btn-sm btn-outline btn-info flex items-center gap-1 transition-transform duration-300 hover:scale-105"
          >
            <Pencil size={16} /> Edit
          </Link>

          <button
            onClick={() => handleDelete(food._id)}
            className="btn btn-sm btn-outline btn-error flex items-center gap-1 transition-transform duration-300 hover:scale-105"
          >
            <Trash2 size={16} /> Delete
          </button>

          <Link
            to={`/allFoods/${food._id}`}
            className="btn btn-sm btn-outline btn-primary flex items-center gap-1 transition-transform duration-300 hover:scale-105"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  ))}
</div>


      ) : (
        <div className="overflow-x-auto p-2">
          <table className="w-full bg-base-200 rounded shadow">
            <thead className="bg-primary text-primary-content">
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Expiration</th>
                <th>Pickup</th>
                <th colSpan={2}>Actions</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id} className="hover">
                  <td>
                    <img src={food.foodImage} alt={food.foodName} className="h-12 w-12 rounded" />
                  </td>
                  <td>{food.foodName}</td>
                  <td>{food.category}</td>
                  <td>{food.foodQuantity}</td>
                  <td>{food.expiredDate}</td>
                  <td>{food.pickupLocation}</td>
                  <td>
                    <Link to={`/updateFood/${food._id}`} className="btn btn-xs btn-info flex gap-1">
                      <Pencil size={14} /> Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn btn-xs btn-error flex gap-1"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                  <td>
                    <Link to={`/allFoods/${food._id}`} className="btn btn-xs btn-primary">
                      Details
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

export default ManageMyFoods;
