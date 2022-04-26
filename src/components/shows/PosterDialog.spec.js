import React from "react";
import {fireEvent, render} from "@testing-library/react";
import PosterDialog from './PosterDialog';

describe("Basic rendering of elements in enlarged version of movie poster", () => {
    const onClose = jest.fn();
    it("Should display the name of the movie", () => {
        const { getByTestId } = render(<PosterDialog posterLink = {"https://m.media-amazon.com/images/M/MV5BMjJiN2UwYWItNWJjNi00Zjg4LWE5NmItMmM4N2I3ZjY3OTY2XkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_SX300.jpg"} name = {"Pet Sematary"} open = {true} onClose = {onClose}/>);

        expect(getByTestId("poster-title").innerHTML).toContain("Pet Sematary");
    });
    it("Should display the cross button on the enlarged version of the movie poster", () => {
        const { getByTestId } = render(<PosterDialog posterLink = {"https://m.media-amazon.com/images/M/MV5BMjJiN2UwYWItNWJjNi00Zjg4LWE5NmItMmM4N2I3ZjY3OTY2XkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_SX300.jpg"} name = {"Pet Sematary"} open = {true} onClose = {onClose}/>);

        expect(getByTestId("close-button")).toBeDefined();
    });
    it("Should display the movie poster image", () => {
        const { getByTestId } = render(<PosterDialog posterLink = {"https://m.media-amazon.com/images/M/MV5BMjJiN2UwYWItNWJjNi00Zjg4LWE5NmItMmM4N2I3ZjY3OTY2XkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_SX300.jpg"} name = {"Pet Sematary"} open = {true} onClose = {onClose}/>);

        expect(getByTestId("movie-poster")).toBeDefined();
    })
    it("Should be able to close the poster dialog", () => {
        const { getByTestId } = render(<PosterDialog posterLink = {"https://m.media-amazon.com/images/M/MV5BMjJiN2UwYWItNWJjNi00Zjg4LWE5NmItMmM4N2I3ZjY3OTY2XkEyXkFqcGdeQXVyODQxMTI4MjM@._V1_SX300.jpg"} name = {"Pet Sematary"} open = {true} onClose = {onClose}/>);
        
        fireEvent.click(getByTestId("close-button"));

        expect(onClose).toHaveBeenCalledTimes(1);
    })
});