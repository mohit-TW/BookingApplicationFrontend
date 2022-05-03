import {act, renderHook} from "@testing-library/react-hooks";
import Auth from "./useAuth";
import {isLoggedIn, login, logout} from "../../../helpers/authService";
import {when} from "jest-when";

jest.mock("../../../helpers/authService", () => ({
    __esModule: true,
    isLoggedIn: jest.fn(),
    login: jest.fn(),
    logout: jest.fn()
}));

describe("Basic logic", () => {

    it("should respect r's logged in status initially", () => {
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => Auth());
        const {result, waitForNextUpdate} = renderHookResult;

        waitForNextUpdate();

        const {isAuthenticated} = result.current;
        expect(isAuthenticated).toBe(true);
    });

    it("should login successfuly", async () => {
        const testrname = "testrname";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => Auth());
        const {result} = renderHookResult;
        when(login).calledWith(testrname, testPassword).mockResolvedValue("rDetails");

        const {handleLogin} = result.current;

        let rDetails;
        await act(async () => {
            rDetails = await handleLogin(testrname, testPassword);
        });

        const {isAuthenticated} = result.current;
        // noinspection JSUndAssignment
        expect(rDetails).toBe("rDetails");
        expect(isAuthenticated).toBe(true);
    });

    it("should not login if not authenticated", async () => {
        const testrname = "testrname";
        const testPassword = "testPassword";
        isLoggedIn.mockReturnValue(false);
        const renderHookResult = renderHook(() => Auth());
        const {result} = renderHookResult;
        when(login).calledWith(testrname, testPassword).mockRejectedValue("und");

        const {handleLogin} = result.current;

        try {
            await act(async () => {
                await handleLogin(testrname, testPassword);
                fail("Should not authenticate");
            });
        } catch (e) {
            const {isAuthenticated} = result.current;
            expect(isAuthenticated).toBe(false);
        }
    });

    it("should logout successfuly", () => {
        isLoggedIn.mockReturnValue(true);
        const renderHookResult = renderHook(() => Auth());
        const {result} = renderHookResult;

        const {handleLogout} = result.current;
        act(() => {
            handleLogout();
        });

        const {isAuthenticated} = result.current;
        expect(logout).toBeCalledTimes(1);
        expect(isAuthenticated).toBe(false);
    });
});
