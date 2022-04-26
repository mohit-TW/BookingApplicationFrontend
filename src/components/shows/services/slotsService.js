import apiService from "../../../helpers/apiService";

export default {
    fetchSlots: async (date) => {
        const response = await apiService.get(`slots?date=${date}`);
        return response.data;
    }
}