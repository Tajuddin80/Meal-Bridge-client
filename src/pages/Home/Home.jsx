import { useEffect, useState } from "react";
import FeaturedFoods from "../../component/FeaturedFoods/FeaturedFoods";
import Slider from "../../component/Slider/Slider";
import axios from "axios";
import Faq from "../../component/Faq/Faq";
import Review from "../../component/Review/Review";
import { useContext } from "react";
import { AuthContext } from "../../Firebase/AuthContext/AuthContext";
const Home = () => {
  const {user} = useContext(AuthContext)
   const [featuredFood, setFeaturedFood] = useState([]);
   const [loading , setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
  axios.get("http://localhost:3000/featuredfood")
    .then((res) => 
    {

      setFeaturedFood(res.data)
      setLoading(false)
    }
    )
    .catch((err) => console.error("Error fetching featured food:", err));
}, []);

  return (
    <>
      <Slider></Slider>
      
      <FeaturedFoods loading={loading} featuredFood={featuredFood}></FeaturedFoods>
      <Faq></Faq>

{
  user &&   <Review></Review>
}

    
    </>
  );
};

export default Home;
