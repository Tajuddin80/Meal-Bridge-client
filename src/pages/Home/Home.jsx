import { useEffect, useState } from "react";
import FeaturedFoods from "../../component/FeaturedFoods/FeaturedFoods";
import Slider from "../../component/Slider/Slider";
import axios from "axios";
const Home = () => {
   const [featuredFood, setFeaturedFood] = useState([]);
  useEffect(() => {
  axios.get("http://localhost:3000/featuredfood")
    .then((res) => setFeaturedFood(res.data))
    .catch((err) => console.error("Error fetching featured food:", err));
}, []);

  return (
    <>
      <Slider></Slider>
      <FeaturedFoods featuredFood={featuredFood}></FeaturedFoods>
    </>
  );
};

export default Home;
