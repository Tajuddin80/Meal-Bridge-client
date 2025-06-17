import axios from "axios";

export const fetchMyFoodsApi = (accessToken) => {
  return axios
    .get(`https://meal-bridge-server-one.vercel.app/myfoods`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data);
};
