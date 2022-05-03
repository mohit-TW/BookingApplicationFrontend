import apiService from "../../../helpers/apiService";

export default {
    fetch: async () => {
        const response = await apiService.get(`features`);
        return response.data;
    }
}

