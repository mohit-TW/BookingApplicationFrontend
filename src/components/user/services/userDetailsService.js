import apiService from "../../../helpers/apiService";

export default {
    fetch: async (name) => {
        return await apiService.get(`userDetails?username=${name}`);
    },
}