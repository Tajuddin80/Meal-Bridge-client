
import FoodCard from "./FoodCard";

const FeaturedFoods = ({ featuredFood }) => {


  return (
    <div className="mb-20">
      <h2 className="text-4xl font-semibold mb-3 text-center">
        Featured Foods
      </h2>
      <hr className="md:w-[35vw] lg:w-[20vw] w-[65vw] mb-10 mx-auto" />
      <div className="grid gap-8 w-[95vw] mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

        {
          featuredFood.map(food => <FoodCard key={food._id} food={food}></FoodCard>)
        }
      </div>
    </div>
  );
};

export default FeaturedFoods;
