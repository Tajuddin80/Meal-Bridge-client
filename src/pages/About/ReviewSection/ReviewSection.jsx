import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReviewCard from "./ReviewCard";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/allreviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2 className="text-3xl  md:text-4xl text-center font-bold mt-10">
        All Reviews
      </h2>
      <hr className="md:w-[35vw] lg:w-[20vw] w-[65vw] mb-10 gap-10 mx-auto" />
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[95vw] mb-20 mx-auto">
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
