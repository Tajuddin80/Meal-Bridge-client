import axios from "axios";

export const myRequestedFoodsPromise = (email) => {
  return axios
    .get(`http://localhost:3000/requestedFood`, {
      params: { email }, // cleaner way to pass query param
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching foods:", err);
      throw err;
    });
};
