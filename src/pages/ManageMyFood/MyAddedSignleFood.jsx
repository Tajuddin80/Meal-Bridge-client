import { Link } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyAddedSignleFood = ({ food, handleDelete }) => {
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
        <Link
          to={`/updateFood/${_id}`}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          title="Edit"
        >
          <FaEdit className="text-lg" />
          <span className="hidden sm:inline">Edit</span>
        </Link>
      </td>

      <td className="py-2 px-4">
        <button
          onClick={() => handleDelete(_id)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
          title="Delete"
        >
          <FaTrash className="text-lg" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </td>

      <td className="py-2 px-4">
        <Link to={`/allFoods/${_id}`} className="text-info hover:underline">
          View Details
        </Link>
      </td>
    </tr>
  );
};

export default MyAddedSignleFood;
