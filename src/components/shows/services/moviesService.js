import apiService from "../../../helpers/apiService";

export default {
    fetchAllMovies: async () => {
        const response = await apiService.get("movies");
        return response.data;
    }
}