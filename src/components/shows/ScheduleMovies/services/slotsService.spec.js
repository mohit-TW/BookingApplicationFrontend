import apiService from "../../../../helpers/apiService";
import slotsService from "./slotsService";

jest.mock("../../../../helpers/apiService");

describe("Slot Service", () => {
  const date = "2022-05-03";

  it("should return available slots for a particular date", async () => {
    const mockData = [
      {
        slots: [
          {
            endTime: "16:00",
            id: 0,
            name: "Slot name",
            startTime: "13:30",
          },
        ],
      },
    ];

    apiService.get.mockResolvedValueOnce({ data: mockData });

    const slot = await slotsService.fetchSlots(date);

    expect(slot).toHaveLength(1);
    expect(slot).toEqual([
      {
        slots: [
          {
            endTime: "16:00",
            id: 0,
            name: "Slot name",
            startTime: "13:30",
          },
        ],
      },
    ]);
  });
});
