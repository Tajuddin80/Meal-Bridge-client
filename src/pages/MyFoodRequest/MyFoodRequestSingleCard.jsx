import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const MyFoodRequestSingleCard = ({ food, onRemove }) => {
  const [status, setStatus] = useState(food.status || "requested");
  const [disabled, setDisabled] = useState(food.status === "Received");
  const { user } = useContext(AuthContext);

  const handleChange = async (e) => {
    const newStatus = e.target.value;

    if (newStatus === "Received") {
      const confirmed = await Swal.fire({
        title: "Have you received the food?",
        text: "Once marked as received, you can't change it again.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I received it",
        cancelButtonText: "No, cancel",
      });

      if (!confirmed.isConfirmed) {
        setStatus("requested");
        return;
      }

      try {
        const token = await user.getIdToken();
        const foodId = food.requestedFood.id;

        // Update quantity and delete request
        const [foodRes, requestsRes] = await Promise.all([
          axios.get(
            `https://meal-bridge-server-one.vercel.app/allFoods/${foodId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          ),
          axios.get(`https://meal-bridge-server-one.vercel.app/requestedFood`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const availableFood = foodRes.data;
        const requestedItem = requestsRes.data.find(
          (item) => item._id === food._id
        );

        if (!availableFood || !requestedItem) {
          Swal.fire("Error", "Requested food not found.", "error");
          return;
        }

        const updatedQuantity =
          availableFood.foodQuantity - requestedItem.requestedQuantity;

        if (updatedQuantity < 0) {
          Swal.fire("Oops", "Not enough food available", "warning");
          return;
        }

        await axios.patch(
          `https://meal-bridge-server-one.vercel.app/updateFoodAmount/${foodId}`,
          { foodQuantity: Number(updatedQuantity) },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await axios.delete(
          `https://meal-bridge-server-one.vercel.app/requestedFood/${food._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setStatus("Received");
        setDisabled(true);
        onRemove(food._id);

        Swal.fire("Success!", "Marked as received.", "success");
      } catch (err) {
        console.error("Error processing food receipt:", err);
        Swal.fire("Error", "Something went wrong. Try again later.", "error");
      }
    } else {
      setStatus(newStatus);
    }
  };

  return (
 <div
  className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
>
  <figure className="relative">
    <img
      src={food.requestedFood.image}
      alt={food.requestedFood.name}
      className="rounded-none h-40 w-full object-cover transition duration-500 hover:brightness-110"
    />
    <span className="absolute top-2 left-2 bg-primary text-primary-content text-xs font-semibold px-2 py-1 rounded animate-pulse">
      {food.requestedFood.category || "Food"}
    </span>
  </figure>

  <div className="card-body text-left p-4 space-y-2 text-lg">
    <h2 className="card-title font-bold transition-colors duration-300 hover:text-primary">
      {food.requestedFood.name}
    </h2>
    <p className="text-base-content/80">
      Quantity Requested: <span className="font-semibold">{food.requestedQuantity}</span>
    </p>
    <p className="text-base-content/80">
      Expires: <span className="font-semibold">{food.expiredDate}</span>
    </p>
    <p className="text-base-content/80">
      Pickup: <span className="font-semibold">{food.pickupLocation}</span>
    </p>

    <div className="flex flex-wrap gap-2 mt-3">
      <Link
        to={`/allFoods/${food.requestedFood.id}`}
        className="btn btn-sm btn-outline btn-primary flex items-center gap-1 transition-transform duration-300 hover:scale-105"
      >
        View Details
      </Link>
    </div>

    <div className="mt-2">
      <select
        className="select select-sm select-bordered w-full transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary"
        value={status}
        disabled={disabled}
        onChange={handleChange}
      >
        <option value="requested">Requested</option>
        <option value="Received">Received</option>
      </select>
    </div>
  </div>
</div>


  );
};

export default MyFoodRequestSingleCard;
