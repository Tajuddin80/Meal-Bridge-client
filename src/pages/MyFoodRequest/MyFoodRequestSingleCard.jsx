import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyFoodRequestSingleCard = ({ food, onRemove }) => {
  const [status, setStatus] = useState(food.status || "requested");
  const [disabled, setDisabled] = useState(food.status === "Received");

  const handleChange = (e) => {
    const newStatus = e.target.value;

    if (newStatus === "Received") {
      Swal.fire({
        title: "Have you received the food?",
        text: "Once marked as received, you can't change it again.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, I received it",
        cancelButtonText: "No, cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          setStatus("Received");
          setDisabled(true);

          const foodId = food.requestedFood.id;

          Promise.all([
            axios.get(`http://localhost:3000/allFoods/${foodId}`),
            axios.get(`http://localhost:3000/requestedFood`)
          ])
            .then(([availableRes, requestedRes]) => {
              const availableFoodAmount = availableRes.data.foodQuantity;

              const requestedFood = requestedRes.data.find(
                item => item.requestedFood.id === foodId
              );

              if (!requestedFood) {
                console.warn("Requested food not found for this food ID");
                return;
              }

              const requestedFoodAmount = requestedFood.requestedQuantity;
              const newFoodQuantity = availableFoodAmount - requestedFoodAmount;

              if (newFoodQuantity < 0) {
                console.warn("Not enough food to fulfill the request");
                return;
              }

              axios.patch(`http://localhost:3000/updateFoodAmount/${foodId}`, {
                foodQuantity: newFoodQuantity
              })
                .then(() => {
                  axios.delete(`http://localhost:3000/requestedFood/${food._id}`)
                    .then(() => {
                      Swal.fire(
                        "Updated!",
                        "The status has been set to Received and request removed.",
                        "success"
                      );
                      onRemove(food._id);
                    })
                    .catch(err => {
                      console.error("Error deleting request:", err);
                    });
                })
                .catch(updateErr => {
                  console.error("Error updating food amount:", updateErr);
                });
            })
            .catch(err => {
              console.error("Error fetching data:", err);
            });

        } else {
          setStatus("requested");
        }
      });
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
    <Link to={`/allFoods/${food.requestedFood.id}`} className="text-info hover:underline">
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
