import axios from "axios";

export const myRequestedFoodsPromise = (accessToken) => {
  return axios
    .get(`http://localhost:3000/requestedFood`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Error fetching foods:", err);
      throw err;
    });
};
