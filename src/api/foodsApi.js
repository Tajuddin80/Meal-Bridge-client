import axios from "axios";

export const myAddedFoodsPromies = (email) => {
  return axios
    .get(`http://localhost:3000/allFoods?email=${email}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching added foods:", err);
      throw err;
    });
};
