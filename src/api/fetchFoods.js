import axios from "axios";

export const fetchFoods = (query) => {
  const params = new URLSearchParams(query).toString();
  return axios
    .get(`http://localhost:3000/allFoods?${params}`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching foods:", err);
      throw err;
    });
};
