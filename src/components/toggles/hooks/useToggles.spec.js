import {renderHook} from "@testing-library/react-hooks";
import useToggles from "./useToggles";
import featureToggleService from "../services/FeatureToggleService";
import {when} from "jest-when";

jest.mock("../services/FeatureToggleService", () => ({
    __esModule: true,
    default: {
        fetch: jest.fn()
    }
}));

describe("Basic logic", () => {

    beforeEach(() => {
        when(featureToggleService.fetch).calledWith().mockResolvedValue({"CHANGE_PASSWORD":false});
    });

    it("Should initialize the hook with empty shows and loading", () => {
        const {result} = renderHook(() => useToggles());
        const {toggles, toggleNames} = result.current;

        expect(toggles).toEqual({
            "MOVIE_SCHEDULE": true,
            "CHANGE_PASSWORD": true,
            "CUSTOMER_SIGN_UP" : true,
            "VIEW_USER_PROFILE" : true
        });
        expect(toggleNames).toEqual({
            MOVIE_SCHEDULE: 'MOVIE_SCHEDULE',
            CHANGE_PASSWORD: 'CHANGE_PASSWORD',
            CUSTOMER_SIGN_UP : 'CUSTOMER_SIGN_UP',
            VIEW_USER_PROFILE : 'VIEW_USER_PROFILE'
        });
    });

    it("Should get shows and finish loading after mount", async () => {
        const {result, waitForNextUpdate} = renderHook(() => useToggles());

        await waitForNextUpdate();
        const {toggles} = result.current;

        expect(toggles).toEqual({"MOVIE_SCHEDULE": true,
            "CHANGE_PASSWORD": false,
            "CUSTOMER_SIGN_UP": true,
            "VIEW_USER_PROFILE": true});
    });
});
