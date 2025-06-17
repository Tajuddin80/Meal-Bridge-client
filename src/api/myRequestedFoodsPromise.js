import axios from "axios";

export const myRequestedFoodsPromise = (accessToken) => {
  return axios
    .get(`https://meal-bridge-server-jmroay962-taj-uddins-projects-665cefcc.vercel.app/requestedFood`, {
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
