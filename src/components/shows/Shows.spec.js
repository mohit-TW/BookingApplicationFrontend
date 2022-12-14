import React from "react";
import { fireEvent, render } from "@testing-library/react";
import Shows from "./Shows";
import { when } from "jest-when";
import { dateFromSearchString, nextDateLocation, previousDateLocation } from "./services/dateService";
import useShows from "./hooks/useShows";
import SeatSelectionDialog from "./SeatSelectionDialog";
import useShowsRevenue from "./hooks/useShowsRevenue";
import { shallow } from "enzyme";
import ShowsRevenue from "./ShowsRevenue";
import FormikButton from "../formik/FormikButton";
import ScheduleMovieDialog from "./ScheduleMovies/ScheduleMovieDialog";
import useToggles from "../toggles/hooks/useToggles";
import { FeatureToggleProvider } from "react-feature-toggles/lib";
import useUser from "../user/hooks/useUser";

jest.mock("./services/dateService", () => ({
    dateFromSearchString: jest.fn(),
    nextDateLocation: jest.fn(),
    previousDateLocation: jest.fn()
}));

jest.mock("./hooks/useShows", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./hooks/useShowsRevenue", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("../toggles/hooks/useToggles", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("./SeatSelectionDialog", () => {
    return () => <div>SeatSelection</div>;
});

jest.mock("./ScheduleMovies/ScheduleMovieDialog", () => {
    return () => <div>ScheduleMovie</div>
})

jest.mock("../user/hooks/useUser", () => ({
    __esModule: true,
    default: jest.fn()
}));

describe("Basic rendering and functionality", () => {
    let testHistory;
    let testLocation;
    let testShowDate;
    let testToggles;

    beforeEach(() => {
        testHistory = {
            push: jest.fn()
        };

        testLocation = {
            search: "testSearch"
        };

        testShowDate = {
            format: jest.fn()
        };

        testToggles = {
            MOVIE_SCHEDULE: true
        }

        when(dateFromSearchString).calledWith("testSearch").mockReturnValue(testShowDate);
        when(nextDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Next Location");
        when(previousDateLocation).calledWith(testLocation, testShowDate).mockReturnValue("Previous Location");
        when(testShowDate.format).calledWith("Do MMM YYYY").mockReturnValue("Show Date");
        when(useShows).calledWith(testShowDate).mockReturnValue({
            showsLoading: false,
            shows: [
                {
                    id: 1,
                    cost: 150,
                    movie: { name: "Movie 1", posterLink: "http://dummy.jpg" },
                    slot: { startTime: "start time 1" }
                }, {
                    id: 2,
                    cost: 160,
                    movie: { name: "Movie 2", posterLink: "http://dummy.jpg" },
                    slot: { startTime: "start time 2" }
                }
            ]
        });
        when(useShowsRevenue).calledWith(testShowDate).mockReturnValue({
            showsRevenue: 549.99,
            showsRevenueLoading: false
        });
        when(useToggles).calledWith().mockReturnValue({
            toggleNames: {
                MOVIE_SCHEDULE: 'MOVIE_SCHEDULE'
            },
            toggles: {
                "MOVIE_SCHEDULE": true,
            }
        });
        when(useUser).calledWith().mockReturnValue({
            user:{
                role: "ADMIN",
            },
        });
    });

    it("Should display the show info", () => {
        const shows = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <Shows history={testHistory} location={testLocation} />
            </FeatureToggleProvider>);

        shows.getByText("Shows (Show Date)");

        shows.getByText("Movie 1");
        shows.getByText("start time 1");
        shows.getByText("???150");

        shows.getByText("Movie 2");
        shows.getByText("start time 2");
        shows.getByText("???160");
    });

    it("Should push to history if next or previous clicked", () => {
        const shows = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <Shows history={testHistory} location={testLocation} />
            </FeatureToggleProvider>);

        const previousDayButton = shows.getByText("Previous Day");
        const nextDayButton = shows.getByText("Next Day");

        fireEvent.click(previousDayButton);
        fireEvent.click(nextDayButton);

        expect(testHistory.push).toBeCalledTimes(2);
        expect(testHistory.push).toHaveBeenNthCalledWith(1, "Previous Location");
        expect(testHistory.push).toHaveBeenNthCalledWith(2, "Next Location");
    });

    it("Should display seat selection when a show is selected", () => {
        const { getByText, queryByText } = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <Shows history={testHistory} location={testLocation} />
            </FeatureToggleProvider>);

        expect(queryByText("SeatSelectionDialog")).toBeNull();

        fireEvent.click(getByText("Movie 1"));

        expect(getByText("SeatSelection")).toBeTruthy();
    });

    it("Should display revenue when rendered", () => {
        const shows = shallow(<Shows history={testHistory} location={testLocation} />);

        const showsRevenue = shows.find(ShowsRevenue);

        expect(showsRevenue.prop("showsRevenue")).toBe(549.99);
        expect(showsRevenue.prop("showsRevenueLoading")).toBe(false);
    });

    it("Should display poster when rendered", () => {
        const { getAllByTestId } = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <Shows history={testHistory} location={testLocation} />
            </FeatureToggleProvider>);

        const posterLink = "http://dummy.jpg";

        const moviePosters = getAllByTestId("poster");
        moviePosters.forEach(element => {
            expect(element.getAttribute("src")).toBe(posterLink);
        });
    });

    it("Should display schedule movie when rendered", () => {
        const shows = shallow(<Shows history={testHistory} location={testLocation} />);

        const scheduleButton = shows.find(FormikButton);

        expect(scheduleButton.prop("name")).toBe("SCHEDULE MOVIE");
    });

    it("should display the shedule movie dialog when schedule movie button is clicked", () => {
        const { getByText, queryByText } = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <Shows history={testHistory} location={testLocation} />
            </FeatureToggleProvider>
        );
        //it("should display the schedule movie dialog when schedule movie button is clicked", ()=>{
        //  const {getByText, queryByText} = render(<Shows history={testHistory} location={testLocation}/>);

        expect(queryByText("ScheduleMovieDialog")).toBeNull();

        fireEvent.click(getByText("SCHEDULE MOVIE"));

        expect(getByText("ScheduleMovie")).toBeTruthy();
    });

    it("should not display the shedule movie button when feature is disabled", () => {
        testToggles.MOVIE_SCHEDULE = false;

        const { getByText, queryByText } = render(
            <FeatureToggleProvider featureToggleList={testToggles}>
                <Shows history={testHistory} location={testLocation} />
            </FeatureToggleProvider>
        );

        expect(queryByText("ScheduleMovieDialog")).toBeNull();

        expect(queryByText("SCHEDULE MOVIE")).toBeNull();
    });
});
