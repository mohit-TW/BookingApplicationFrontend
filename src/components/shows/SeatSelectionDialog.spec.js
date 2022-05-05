import React from "react";
import {fireEvent, render} from "@testing-library/react";
import SeatSelectionDialog from "./SeatSelectionDialog";
import useUser from "../user/hooks/useUser";
import { when } from "jest-when";
import useToggles from "../toggles/hooks/useToggles";
import { FeatureToggleProvider } from "react-feature-toggles/lib";

jest.mock("./CustomerDetailsDialog", () => {
    return ({open}) => <div>Customer Details is {open ? "open" : "closed"}</div>
});

jest.mock("../user/hooks/useUser", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("../toggles/hooks/useToggles", () => ({
    __esModule: true,
    default: jest.fn()
}));

when(useToggles).calledWith().mockReturnValue({
    toggleNames: {
        CUSTOMER_BOOKING : 'CUSTOMER_BOOKING'
    },
    toggles: {
        "MOVIE_SCHEDULE": false,
    }
});
when(useUser).calledWith().mockReturnValue({
    user:{
        role: "ADMIN",
    },
});

describe("Basic rendering and functionality", () => {
    const openDialog = true;
    const onClose = jest.fn();
    const updateShowRevenue = jest.fn();

    const selectedShow = {
        id: 1,
        cost: 150,
        movie: {
            name: "Movie 1",
            plot: "Suspense movie",
            duration: "1hr 30m",
            posterLink: "http://dummy.jpg"
        },
        slot: {startTime: "start time 1"}
    };
    
    beforeEach(()=>{
        when(useUser).calledWith().mockReturnValue({
            user:{
                role: "ADMIN",
            },
        });
    })

    it("Should display the show info", () => {
        const {queryByText, queryByDisplayValue} = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                                               open={openDialog} onClose={onClose}
                                                                               updateShowsRevenue={updateShowRevenue}/>);

        expect(queryByText(selectedShow.movie.name)).toBeTruthy();
        expect(queryByText(selectedShow.movie.plot)).toBeTruthy();
        expect(queryByText(selectedShow.movie.duration)).toBeTruthy();
        expect(queryByText("Seats")).toBeTruthy();
        expect(queryByDisplayValue("1")).toBeTruthy();
    });

    it("Should display total cost when number of seats is selected", () => {
        const {queryByText, getByDisplayValue} = render(<SeatSelectionDialog selectedShow={selectedShow}
                                                                             open={openDialog} onClose={onClose}
                                                                             updateShowsRevenue={updateShowRevenue}/>);

        expect(queryByText("₹150.00")).toBeTruthy();
        fireEvent.change(getByDisplayValue("1"), {target: {value: '2'}});

        expect(queryByText("₹300.00")).toBeTruthy();
    });

    it("Should display customer details input on next", () => {
        const {getByText} = render(<SeatSelectionDialog selectedShow={selectedShow} open={openDialog}
                                                        onClose={onClose}
                                                        updateShowsRevenue={updateShowRevenue}/>);

        expect(getByText("Customer Details is closed")).toBeTruthy();

        fireEvent.click(getByText("NEXT"));

        expect(getByText("Customer Details is open")).toBeTruthy();
    });

    it("Should display poster of the selected show", () => {
        const {getByTestId} =  render(<SeatSelectionDialog selectedShow={selectedShow} open={openDialog}
                                                        onClose={onClose}
                                                        updateShowsRevenue={updateShowRevenue}/>);

        expect(getByTestId("poster-image").getAttribute("src")).toBe("http://dummy.jpg");
    })


    it("Should close the dialog when the cross button is clicked", () => {
        const {getByTestId} =  render(<SeatSelectionDialog selectedShow={selectedShow} open={openDialog}
            onClose={onClose}
            updateShowsRevenue={updateShowRevenue}/>);
        
        fireEvent.click(getByTestId("close-button"))

        expect(onClose).toHaveBeenCalledTimes(2);
    })
});
