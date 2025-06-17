import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { AuthContext } from "../../../Firebase/AuthContext/AuthContext";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!user) {
        console.log("User not authenticated. Cannot fetch reviews.");
        return;
      }

      try {
        const token = await user.getIdToken();

        const res = await axios.get(
          "https://meal-bridge-server-one.vercel.app/allreviews",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl text-center font-bold mt-10">
        All Reviews
      </h2>
      <hr className="md:w-[35vw] lg:w-[20vw] w-[65vw] mb-10 gap-10 mx-auto" />
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[95vw] mb-20 mx-auto">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
