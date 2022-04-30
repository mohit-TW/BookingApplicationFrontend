import React from 'react'
import {Dialog, DialogContent, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import styles from "./styles/customerDetailsDialogStyles";
import CloseIcon from "@material-ui/icons/Close";

const BookingConfirmation = ({bookingConfirmation, showConfirmation, onClose}) => {
    const classes = styles();
    return (
      <Dialog open={showConfirmation} onClose={onClose}>
            <Alert onClose={onClose} severity="success">
                Seats booked successfully!
            </Alert>
            <Typography variant="h6" className={classes.dialogHeader}>
                Booking Confirmation
            </Typography>
            <DialogContent>
                <Typography variant="body1" display="block" gutterBottom>
                    Booking id : {bookingConfirmation.id}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Show Date: {bookingConfirmation.showDate}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Show start time: {bookingConfirmation.startTime}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Customer Name: {bookingConfirmation.customerName}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Amount Paid: {bookingConfirmation.amountPaid}
                </Typography>
                <Typography variant="body1" display="block" gutterBottom>
                    Number of seats booked: {bookingConfirmation.noOfSeats}
                </Typography>
            </DialogContent>
        </Dialog>
    )
}

export default BookingConfirmation;
