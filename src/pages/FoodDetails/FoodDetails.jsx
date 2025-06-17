import { useParams, Link, useNavigate } from "react-router";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
import { Helmet } from "react-helmet";

const FoodDetails = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://meal-bridge-server-one.vercel.app/allFoods/${id}`
        );
        setFood(data);
      } catch (err) {
        console.error("Error fetching food details:", err);
        setFood(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFoodDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!food || !food._id) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg font-semibold">
        Food not found.
      </div>
    );
  }

  const handleRequestFood = () => {
    if (food.donor?.donorEmail === user?.email) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Easy there, foodie!",
        text: "You already added this dish — no need for seconds (yet)! 😄",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      document.getElementById("request_modal").showModal();
    }
  };

  const submitRequest = async () => {
    const qtyRaw = document.getElementById("requestQty").value;
    const qty = parseInt(qtyRaw, 10);
    const notes = document.getElementById("requestNotes").value;
    const modal = document.getElementById("request_modal");
    const requestDate = new Date().toLocaleString();

    if (!qtyRaw || isNaN(qty) || qty < 1 || qty > food.foodQuantity) {
      modal.close();
      Swal.fire({
        position: "center",
        icon: "info",
        title: "Invalid Request",
        text: `Please enter a valid quantity between 1 and ${food.foodQuantity}.`,
        showConfirmButton: false,
        timer: 3000,
      }).then(() => modal.showModal());
      return;
    }

    const requestData = {
      requestedQuantity: qty,
      notes,
      requestDate,
      pickupLocation: food.pickupLocation,
      expiredDate: food.expiredDate,
      requestedUser: {
        name: user?.displayName || "N/A",
        email: user?.email || "N/A",
        photoURL: user?.photoURL || "N/A",
      },
      requestedFood: {
        name: food.foodName,
        image: food.foodImage,
        id: food._id,
      },
    };

    modal.close();

    try {
      const token = await user.getIdToken(); // get fresh Firebase token
      const { data } = await axios.get(
        `https://meal-bridge-server-one.vercel.app/requestedFood`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const alreadyRequested = data.some(
        (req) => req.requestedFood.id === food._id
      );

      if (alreadyRequested) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Duplicate Request",
          text: "You have already requested this food. Please update your status before requesting again.",
          showConfirmButton: true,
        });
        navigate("/myFoodRequest");
        return;
      }

      const res = await axios.post(
        `https://meal-bridge-server-one.vercel.app/requestedFood`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Requested food successfully",
          text: "You can request other items too.",
          showConfirmButton: false,
          timer: 3000,
        });
        navigate("/myFoodRequest");
      }
    } catch (err) {
      console.error("Request submission failed:", err);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting your request.",
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Meal Bridge || Details</title>
      </Helmet>
      <motion.div
        className="max-w-4xl mx-auto my-10 p-6 bg-base-100 shadow-lg rounded-lg border border-base-300"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-3xl font-bold mb-6 text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {food.foodName}
        </motion.h2>

        <motion.img
          src={food.foodImage}
          alt={food.foodName}
          className="w-full h-72 object-cover rounded mb-6 shadow"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-base-content/80">
            <p>
              <strong>Category:</strong> {food.category}
            </p>
            <p>
              <strong>Quantity:</strong> {food.foodQuantity}
            </p>
            <p>
              <strong>Pickup Location:</strong> {food.pickupLocation}
            </p>
            <p>
              <strong>Expires on:</strong> {food.expiredDate}
            </p>
            <p>
              <strong>Status:</strong> {food.foodStatus}
            </p>
            {food.additionalNotes && (
              <p>
                <strong>Notes:</strong> {food.additionalNotes}
              </p>
            )}
          </div>

          <motion.div
            className="p-4 rounded-lg shadow-lg bg-base-200 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <img
              src={food.donor?.donorImage}
              alt={food.donor?.donorName}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <h3 className="text-lg font-semibold">{food.donor?.donorName}</h3>
            <p className="text-sm text-base-content/70">
              {food.donor?.donorEmail}
            </p>
            <span className="badge badge-primary mt-2">Donor</span>
          </motion.div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/availableFoods" className="btn btn-outline btn-primary">
            View All Foods
          </Link>
          <Link to="/" className="btn btn-secondary">
            Go Home
          </Link>
          <button
            onClick={handleRequestFood}
            className="btn btn-outline btn-primary"
          >
            Request Food
          </button>
        </div>
      </motion.div>

      <dialog id="request_modal" className="modal">
        <div className="modal-box w-full max-w-3xl lg:max-w-5xl">
          <h3 className="font-bold text-2xl text-primary mb-4">
            Request Food: {food.foodName}
          </h3>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={food.foodImage}
              alt={food.foodName}
              className="w-full md:w-1/2 rounded shadow"
            />
            <div className="w-full md:w-1/2 space-y-3">
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Request Quantity (max: {food.foodQuantity})
                  </span>
                </label>
                <input
                  type="number"
                  id="requestQty"
                  min="1"
                  className="input input-bordered w-full"
                  placeholder={`Enter up to ${food.foodQuantity}`}
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Request Date</span>
                </label>
                <input
                  type="text"
                  value={new Date().toLocaleString()}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Name</span>
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Your Email</span>
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              {user?.photoURL && (
                <div className="flex items-center gap-3 mt-2">
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-12 h-12 rounded-full border shadow"
                  />
                  <span className="text-sm text-base-content/70">
                    This is your profile photo
                  </span>
                </div>
              )}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">
                    Additional Notes (optional)
                  </span>
                </label>
                <textarea
                  id="requestNotes"
                  className="textarea textarea-bordered w-full"
                  placeholder="Write any additional notes..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <form method="dialog">
                  <button className="btn">Close</button>
                </form>
                <button className="btn btn-primary" onClick={submitRequest}>
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default FoodDetails;
