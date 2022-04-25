import apiService from "../../../helpers/apiService";

export default {
  getLoggenInUserDetails: async () => {
    const response = await apiService.get(`login`);
    console.log("GET_USER:"+response.data);
    return response.data;
  },
};
