import React, {useState} from "react";
import jsPDF from 'jspdf';

export default () => {
    const jspdfGenerator = (bookingConfirmation) => {
        var doc = jsPDF('p', 'pt');

        doc.setFont(undefined, 'bold');

        doc.text(230,20, "SkyFox Cinemas");
        doc.text(210,50, "Booking Confirmation");

        doc.text(20,80, "Booking id: ").setFont(undefined, 'normal');
        doc.text(170,80, bookingConfirmation.id.toString());

        doc.setFont(undefined, 'bold');
        doc.text(20,110, "Show Date: ").setFont(undefined, 'normal');
        doc.text(170,110, bookingConfirmation.showDate.toString());

        doc.setFont(undefined, 'bold');
        doc.text(20,140, "Show start time: ").setFont(undefined, 'normal');
        doc.text(170,140, bookingConfirmation.startTime.toString());

        doc.setFont(undefined, 'bold');
        doc.text(20,170, "Customer Name: ").setFont(undefined, 'normal');
        doc.text(170,170, bookingConfirmation.customerName.toString());

        doc.setFont(undefined, 'bold');
        doc.text(20,200, "Amount : ").setFont(undefined, 'normal');
        doc.text(170,200, bookingConfirmation.amountPaid.toString());

        doc.setFont(undefined, 'bold');
        doc.text(20,230, "No.of seats: ").setFont(undefined, 'normal');
        doc.text(170,230, bookingConfirmation.noOfSeats.toString());

        doc.setFont(undefined, 'bold');
        doc.text(20,260, "Payment mode: ").setFont(undefined, 'normal');
        doc.text(170,260, "Cash on window");

        doc.save("Ticket.pdf");
    };

    return {
        jspdfGenerator: jspdfGenerator
    };
};