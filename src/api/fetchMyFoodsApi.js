import axios from "axios";

export const fetchMyFoodsApi = (accessToken) => {
  return axios
    .get(`https://meal-bridge-server-jmroay962-taj-uddins-projects-665cefcc.vercel.app/myfoods`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data);
};
