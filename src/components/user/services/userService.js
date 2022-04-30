import apiService from "../../../helpers/apiService";

export default {
  getLoggenInUserDetails: async () => {
    const response = await apiService.get(`login`);
    return response.data;
  },
  
};
