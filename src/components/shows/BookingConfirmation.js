import React, { useState } from 'react'
import {Button, Dialog, DialogContent, Typography} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert/Alert";
import styles from "./styles/customerDetailsDialogStyles";
import useBookingConfirmation from './hooks/useBookingConfirmation';

const BookingConfirmation = ({bookingConfirmation, showConfirmation, onClose}) => {
    const classes = styles();

    const {jspdfGenerator} = useBookingConfirmation();

    const handleGeneratePdf = () => {
        jspdfGenerator(bookingConfirmation);
    }

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

            <Button className={classes.downloadButton} color="primary" onClick={handleGeneratePdf} > Download</Button>
        </Dialog>
    )
}

export default BookingConfirmation;
