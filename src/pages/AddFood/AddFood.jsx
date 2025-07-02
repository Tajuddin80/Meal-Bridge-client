import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import axios from "axios";
import { Helmet } from "react-helmet";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorImage: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        donorName: user.displayName || "",
        donorEmail: user.email || "",
        donorImage: user.photoURL || "",
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formsData = new FormData(form);
    const foodDetails = Object.fromEntries(formsData.entries());

    const fullData = {
      foodName: foodDetails.foodName,
      foodImage: foodDetails.foodImage,
      foodQuantity: parseInt(foodDetails.foodQuantity),
      pickupLocation: foodDetails.pickupLocation,
      expiredDate: foodDetails.expiredDate,
      additionalNotes: foodDetails.additionalNotes,
      foodStatus: foodDetails.foodStatus,
      category: foodDetails.category,
      // No need to send donor info; backend will handle from token
    };

    if (!user?.accessToken) {
      console.error("No access token found. Please log in again.");
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in again to add food.",
      });
      return;
    }

    axios
      .post("https://meal-bridge-server-one.vercel.app/addFood", fullData, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Food item added!",
            showConfirmButton: false,
            timer: 1500,
          });
          form.reset();
          navigate(`/manageMyFoods`);
        }
      })
      .catch((err) => {
        console.error("Submission error:", err);
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "There was an error adding the food item.",
        });
      });
  };

  return (
    <div className=" my-7 flex items-center justify-center bg-base-50 px-2 py-5 text-base-content">
      <Helmet>
        <title>Meal Bridge || Add Food</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-base-100 shadow-md rounded-lg p-8"
      >
        <h2 className="text-center text-primary text-2xl md:text-3xl font-semibold uppercase border-b pb-2 mb-10">
          Add Food Item
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-1 font-medium">Food Name</label>
            <input
              type="text"
              name="foodName"
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
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
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
              // defaultValue="available"
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
              value={formData.donorName}
              readOnly
              className="input input-disabled w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Donor Image</label>
            <input
              type="text"
              name="donorImage"
              value={formData.donorImage}
              readOnly
              className="input input-disabled w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Donor Email</label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              readOnly
              className="input input-disabled w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Additional Notes</label>
            <textarea
              name="additionalNotes"
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

export default AddFood;
