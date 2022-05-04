import React, {useState} from "react";
import useUser from "../../user/hooks/useUser";
import bookingService from "../services/bookingService";
import moment from "moment";

export default () => {
    const {user} = useUser();

    const handleBooking = async (seats,selectedShow) => {
        const today = moment().format("YYYY-MM-DD");
        const payload = {
                  date: today,
                  noOfSeats: seats,
                  showId: selectedShow.id,
                  username: user.username
        };
        try {
            const response = await bookingService.bookUserCustomer(payload);
            console.log(response.data);
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    return {
        handleBooking: handleBooking
    };
};