import { Link } from "react-router";
import FoodCard from "./FoodCard";

const FeaturedFoods = ({ featuredFood, loading }) => {
  return (
    <div className="mb-20">
      <h2 className="text-4xl font-semibold mb-3 text-center">
        Featured Foods
      </h2>
      <div className="grid gap-8 w-[95vw] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {featuredFood.map((food) => (
          <FoodCard loading={loading} key={food._id} food={food}></FoodCard>
        ))}
      </div>

      <p className="text-base text-gray-700 md:text-lg sm:px-4 my-10 text-center">
        <Link
          to="/availableFoods"
          className="text-center px-5 py-2.5 relative rounded group overflow-hidden font-medium  btn-primary btn inline-block"
        >View all
        </Link>
      </p>
    </div>
  );
};

export default FeaturedFoods;
