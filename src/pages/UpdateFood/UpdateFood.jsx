import React, { useEffect, useState, useContext } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

const UpdateFood = () => {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("");
  
  const foodInfo = useLoaderData();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (foodInfo) {
      setFood(foodInfo);
      setQuantity(foodInfo.foodQuantity ?? "");
    } else {
      setFood(null);
    }
    setLoading(false);
  }, [foodInfo]);

  const handleQuantityChange = (e) => {
    const val = e.target.value;
    if (val === "" || /^[0-9\b]+$/.test(val)) {
      setQuantity(val);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const parsedQuantity = quantity === "" ? 0 : Number(quantity);
    if (parsedQuantity <= 0) {
      Swal.fire("Error", "Food quantity must be greater than zero.", "error");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const foodData = Object.fromEntries(formData.entries());
    foodData.foodQuantity = parsedQuantity;

    delete foodData.donorName;
    delete foodData.donorImage;
    delete foodData.donorEmail;

    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await user.getIdToken();
          const res = await fetch(
            `https://meal-bridge-server-one.vercel.app/updateFood/${id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(foodData),
            }
          );

          const data = await res.json();
          if (data.modifiedCount > 0 || data.acknowledged) {
            Swal.fire("Updated!", "", "success");
            navigate(`/dashboard/manageMyFoods`);
          } else {
            Swal.fire("No changes were made.", "", "info");
          }
        } catch (err) {
          console.error("Submission error:", err);
          Swal.fire("Error updating food.", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-base-100/50 z-50">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!food) {
    return <p className="text-center mt-10 text-red-500">Food not found!</p>;
  }

  return (
    <div className="my-7 flex flex-col items-center justify-center bg-base-50 px-2 py-5 text-base-content">
      <Helmet>
        <title>Meal Bridge || Update Food</title>
      </Helmet>

      <div className="w-full max-w-5xl mb-5">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-lg btn-outline btn-primary"
        >
          ⬅ Back
        </button>
      </div>

      <form
        onSubmit={handleUpdate}
        className="w-full max-w-5xl bg-base-100 shadow-md rounded-lg p-8"
      >
        <h2 className="text-center text-primary text-2xl md:text-3xl font-semibold uppercase border-b pb-2 mb-10">
          Update Food Item
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Food Name</label>
            <input
              type="text"
              name="foodName"
              defaultValue={food.foodName}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Food Image URL</label>
            <input
              type="text"
              name="foodImage"
              defaultValue={food.foodImage}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Food Quantity</label>
            <input
              type="text"
              name="foodQuantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              defaultValue={food.pickupLocation}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Expiration Date</label>
            <input
              type="date"
              name="expiredDate"
              defaultValue={food.expiredDate}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              defaultValue={food.category}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Main-Course">Main-Course</option>
              <option value="Dessert">Dessert</option>
              <option value="Street-Food">Street-Food</option>
              <option value="Side-Dish">Side-Dish</option>
              <option value="Appetizer">Appetizer</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Food Status</label>
            <select
              name="foodStatus"
              defaultValue={food.foodStatus}
              className="select select-bordered w-full"
              required
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Donor Name</label>
            <input
              type="text"
              name="donorName"
              defaultValue={food.donor?.donorName}
              readOnly
              className="input input-disabled w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Donor Image</label>
            <input
              type="text"
              name="donorImage"
              defaultValue={food.donor?.donorImage}
              readOnly
              className="input input-disabled w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Donor Email</label>
            <input
              type="email"
              name="donorEmail"
              defaultValue={food.donor?.donorEmail}
              readOnly
              className="input input-disabled w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Additional Notes</label>
            <textarea
              name="additionalNotes"
              defaultValue={food.additionalNotes}
              rows="4"
              className="textarea textarea-bordered w-full resize-none"
              required
            ></textarea>
          </div>
        </div>

        <button type="submit" className="mt-8 w-full btn btn-primary">
          Update Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
