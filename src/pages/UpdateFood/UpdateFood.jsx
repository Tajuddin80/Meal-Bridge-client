import React, { use, useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const UpdateFood = () => {
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const foodInfo = useLoaderData();



 const { user } = use(AuthContext);
  const { id } = useParams();
const navigate = useNavigate()



 useEffect(() => {
  if (foodInfo && foodInfo.length > 0) {
    setFood(foodInfo[0]);  // pick first food item
    setLoading(false);
  } else {
    setFood(null);
    setLoading(false);
  }
}, [foodInfo]);


  const handleUpdate = (e) => {
    e.preventDefault();

const form = e.target
 const formData = new FormData(form);
const foodData = Object.fromEntries(formData.entries())


const donor = {
    donorImage: foodData.donorImage,
    donorName: foodData.donorName,
    donorEmail: foodData.donorEmail
};
const foodUpdatedData = {
    donor,
...foodData
}


// console.log(foodUpdatedData);
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/updateFood/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(foodUpdatedData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.modifiedCount > 0 || data.acknowledged) {
              Swal.fire("Updated!", "", "success");
              navigate(`/manageMyFoods`)
            } else {
              Swal.fire("No changes were made.", "", "info");
            }
          })
          .catch((err) => {
            // console.error("Submission error:", err);
          });
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
//  console.log(food);
 
  return (
    <div className="min-h-screen my-7 flex items-center justify-center bg-base-50 px-4 py-10 text-base-content">
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
              placeholder="e.g., Ice Cream"
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
              placeholder="Image URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Food Quantity</label>
            <input
              type="number"
              name="foodQuantity"
              defaultValue={food.foodQuantity}
              placeholder="e.g., 10"
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
              placeholder="Location"
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
              <option defaultValue="available">Available</option>
              <option defaultValue="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Donor Name</label>
            <input
              type="text"
              name="donorName"
              defaultValue={food.donor.donorName}
              readOnly
              className="input input-disabled w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Donor Image</label>
            <input
              type="text"
              name="donorImage"
              defaultValue={food.donor.donorImage}
              readOnly
              className="input input-disabled w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Donor Email</label>
            <input
              type="email"
              name="donorEmail"
              defaultValue={food.donor.donorEmail}
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
              placeholder="Extra info..."
              className="textarea textarea-bordered w-full resize-none"
              required
            ></textarea>
          </div>
        </div>

        <button type="submit" className="mt-8 w-full btn btn-primary">
          Add Food
        </button>
      </form>
    </div>
  );
};

export default UpdateFood;
