import axios from "axios";
import React, { use, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const MyFoodRequestSingleCard = ({ food, onRemove }) => {
  const [status, setStatus] = useState(food.status || "requested");
  const [disabled, setDisabled] = useState(food.status === "Received");
  const { user } = use(AuthContext);

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

        // Fetch food data and current requests
        const [foodRes, requestsRes] = await Promise.all([
          axios.get(
            `https://meal-bridge-server-one.vercel.app/allFoods/${foodId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
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

        // Step 1: Update food quantity
        await axios.patch(
          `https://meal-bridge-server-one.vercel.app/updateFoodAmount/${foodId}`,
          { foodQuantity: Number(updatedQuantity) }, // convert to number
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Step 2: Delete the request
        await axios.delete(
          `https://meal-bridge-server-one.vercel.app/requestedFood/${food._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Step 3: Update local state
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
    <tr className="hover:bg-base-200 transition-colors">
      <td className="py-2 px-4 w-20 text-center">
        <img
          src={food.requestedFood.image}
          alt={food.requestedFood.name}
          className="h-12 w-12 object-cover rounded mx-auto"
        />
      </td>
      <td className="py-2 px-4 text-left">{food.requestedFood.name}</td>
      <td className="py-2 px-4 text-center">{food.requestedQuantity}</td>
      <td className="py-2 px-4 text-center">{food.expiredDate}</td>
      <td className="py-2 px-4 text-left">{food.pickupLocation}</td>
      <td className="py-2 px-4 text-center">
        <Link
          to={`/allFoods/${food.requestedFood.id}`}
          className="text-info hover:underline"
        >
          View Details
        </Link>
      </td>
      <td className="py-2 px-4 w-36 text-center">
        <select
          className="select select-sm select-bordered w-full"
          value={status}
          disabled={disabled}
          onChange={handleChange}
        >
          <option value="requested">requested</option>
          <option value="Received">Received</option>
        </select>
      </td>
    </tr>
  );
};

export default MyFoodRequestSingleCard;
