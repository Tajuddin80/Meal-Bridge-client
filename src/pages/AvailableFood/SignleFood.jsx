import React from "react";
import { Link } from "react-router";

const SignleFood = ({ food }) => {
  const {
    _id,
    foodName,
    foodImage,
    foodQuantity,
    pickupLocation,
    expiredDate,
    category,
  } = food;
  return (
    <tr key={_id} className="hover:bg-base-200 transition-colors">
      <td className="py-2 px-4">
        <img
          src={foodImage}
          alt={foodName}
          className="h-16 w-16 object-cover rounded"
        />
      </td>
      <td className="py-2 px-4">{foodName}</td>
      <td className="py-2 px-4">{category}</td>
      <td className="py-2 px-4">{foodQuantity}</td>
      <td className="py-2 px-4">{expiredDate}</td>
      <td className="py-2 px-4">{pickupLocation}</td>
      <td className="py-2 px-4">
        <Link to={`/allFoods/${_id}`} className="text-info hover:underline">
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default SignleFood;
