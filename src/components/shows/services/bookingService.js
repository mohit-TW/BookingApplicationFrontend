import apiService from "../../../helpers/apiService";

export default {
    bookWalkInCustomer: async (payload) => {
        return await apiService.postWithoutErrorHandling("bookings/walkInCustomer", payload);
    },

    bookUserCustomer: async(payload) => {
        return await apiService.postWithoutErrorHandling("bookings/userCustomer",payload);
    }
}
