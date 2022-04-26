import apiService from "../../../helpers/apiService";

export default {
    fetchAllMovies: async () => {
        //console.log("inside fetch");
        const response = await apiService.get("movies");
        //console.log("Resp: " + response.data);
        return response.data;
    }
}