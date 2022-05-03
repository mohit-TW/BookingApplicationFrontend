import { renderHook } from "@testing-library/react-hooks";
import { when } from "jest-when";
import useUser from "./useUser";
import userService from "../services/userService";

jest.mock("../services/userService", () => ({
  __esModule: true,
  default: {
    getLoggenInUserDetails: jest.fn(),
  },
}));

describe("Basic logic", () => {
  beforeEach(() => {
    when(userService.getLoggenInUserDetails).calledWith().mockResolvedValue({
      username: "admin-user",
      name: null,
      dob: null,
      mobileNo: null,
      email: null,
    });
  });

  it("Should initialise hook with empty user details", () => {
    const { result } = renderHook(() => useUser());

    const userDetail = result.current.user;

    expect(userDetail).toEqual({
      username: "",
      name: null,
      dob: null,
      mobileNo: null,
      email: null,
    });
  });

  it("Should get user details after mount", async () => {
    const { result, getMockUserDetails } = renderHook(() => useUser());

    await getMockUserDetails;

    const userDetail = result.current.user;

    expect(userDetail).toEqual({
      username: "admin-user",
      name: null,
      dob: null,
      mobileNo: null,
      email: null,
    });
  });
});
