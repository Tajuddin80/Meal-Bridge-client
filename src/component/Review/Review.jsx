import axios from "axios";
import React, { useState, useContext } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";

const Review = () => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || message.trim() === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please rate and write a message before submitting.",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const userInfo = {
      rating,
      message,
      email: user?.email || "anonymous",
      photoURL: user?.photoURL || "", // fallback values
      createdAt: new Date().toISOString(),
    };

    axios
      .post("https://meal-bridge-server-one.vercel.app/addreviews", userInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title:
              "Thanks for your feedback! You can check your review at about us page",
            showConfirmButton: false,
            timer: 2500,
          });
          setRating(0);
          setMessage("");
        }
      })
      .catch((err) => {
        console.error("Error submitting review:", err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong while submitting your review.",
        });
      });
  };

  return (
    <div className="flex flex-col w-[95vw] max-w-[95vw] px-6 py-8 shadow-sm rounded-xl bg-base-100 text-base-content mx-auto my-8">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <h2 className="text-5xl font-bold text-center mb-6">
          Your opinion matters!
        </h2>

        <div className="flex flex-col items-center py-6 space-y-3">
          <span className="text-center">How was your experience?</span>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill={
                    (hovered || rating) >= star ? "#facc15" : "currentColor"
                  }
                  className={`w-8 h-8 transition-colors ${
                    (hovered || rating) >= star
                      ? "text-yellow-400"
                      : "text-gray-400"
                  }`}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <textarea
            rows="3"
            placeholder="Message..."
            className="w-full p-4 rounded-md resize-none bg-base-200 text-base-content border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-3 my-6 font-semibold rounded-md bg-primary text-primary-content hover:bg-primary-focus transition"
          >
            Leave feedback
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="text-sm text-base-content opacity-70  hover:underline"
        >
          Maybe later
        </Link>
      </div>
    </div>
  );
};

export default Review;
