// import { useParams } from "react-router";
// import { foodDetailsApiPromies } from "../../api/foodDetailsApi";
// import { useEffect, useState } from "react";

const FoodDetails = () => {
//   const { id } = useParams(); // destructure id from params
//   const [food, setFood] = useState(null); // state to store the food details
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchFoodDetails = async () => {
//       try {
//         setLoading(true);
//         const data = await foodDetailsApiPromies(id); // pass id
//         setFood(data);
//         console.log(data);
        
//       } catch (err) {
//         console.error("Error fetching food details:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchFoodDetails();
//     }
//   }, [id]);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   if (!food) {
//     return <div className="text-center mt-10">Food not found.</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto my-10 p-6 bg-base-100 shadow rounded">
//       <h2 className="text-2xl font-bold mb-4">{food.foodName}</h2>
//       <img src={food.foodImage} alt={food.foodName} className="w-full h-64 object-cover rounded mb-4" />
//       <p><strong>Category:</strong> {food.category}</p>
//       <p><strong>Quantity:</strong> {food.foodQuantity}</p>
//       <p><strong>Pickup Location:</strong> {food.pickupLocation}</p>
//       <p><strong>Expires on:</strong> {food.expiredDate}</p>
//       <p><strong>Additional Notes:</strong> {food.additionalNotes}</p>
//     </div>
//   );
};

export default FoodDetails;
