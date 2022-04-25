import apiService from "../../../helpers/apiService";

export default {
    create: async (payload) => {
        return await apiService.put("changePassword", payload);
    }
}