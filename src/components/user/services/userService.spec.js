import apiService from "../../../helpers/apiService";
import userService from "./userService";

jest.mock("../../../helpers/apiService");

describe("User Service", () => {
  it("should return username", async () => {
    const mockData = [
      {
        data: {
          username: "admin-user",
        },
      },
    ];

    apiService.get.mockResolvedValueOnce({ data: mockData });

    const user = await userService.getLoggenInUserDetails();

    expect(user).toHaveLength(1);
    expect(user).toEqual([
      {
        data: {
          username: "admin-user",
        },
      },
    ]);
  });
});
