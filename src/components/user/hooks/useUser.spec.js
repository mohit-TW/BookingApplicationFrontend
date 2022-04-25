import {renderHook} from "@testing-library/react-hooks";
import moment from "moment";
import {when} from "jest-when";
import useUser from "./useUser";
import userService from "../services/userService";

jest.mock("../services/userService", () => ({
    __esModule: true,
    default: {
        getLoggenInUserDetails: jest.fn()
    }
}));

describe("Basic logic", () => {

    beforeEach(() => {
        when(userService.getLoggenInUserDetails).calledWith().mockResolvedValue({
            username: "admin-user",
            password: "",
            name: null,
            mobileNo: null,
            email: null,
          });
    });

    it("Should initialise hook with empty user details", () => {
        const {result} = renderHook(() => useUser());

        const userDetails = result.current;
        //console.log(userDetails);

        expect(userDetails).toEqual({
            username: "",
            password: "",
            name: null,
            mobileNo: null,
            email: null
          });
        //expect(showsLoading).toBe(true);
    })

    it("Should get user details after mount", async()=>{
        const {result, getMockUserDetails} = renderHook(() => useUser());

        await getMockUserDetails;

        const userDetails = result.current;
        //console.log(userDetails);


        expect(userDetails).toEqual({
            username: "admin-user",
            password: "",
            name: null,
            mobileNo: null,
            email: null
          });

    })
})