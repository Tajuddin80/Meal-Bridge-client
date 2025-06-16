import axios from "axios";

export const fetchMyFoodsApi = (accessToken) => {
  return axios
    .get(`http://localhost:3000/myfoods`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    .then(res => res.data);
};
