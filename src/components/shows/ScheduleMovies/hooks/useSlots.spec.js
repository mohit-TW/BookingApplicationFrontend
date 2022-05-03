import { renderHook } from "@testing-library/react-hooks";
import { when } from "jest-when";
import useSlots from "./useSlots";
import slotsService from "../services/slotsService";
import moment from "moment";
import { QUERY_DATE_FORMAT } from "../../../../Constants";

jest.mock("../services/slotsService", () => ({
  __esModule: true,
  default: {
    fetchSlots: jest.fn(),
  },
}));

describe("basic rendering", () => {
  let slotDate = "2022-05-12";
  const callBack = jest.fn((x) => true);

  beforeEach(() => {
    slotDate = moment(slotDate, "YYYY-MM-DD");
    slotDate = slotDate.format(QUERY_DATE_FORMAT);
    when(slotsService.fetchSlots)
      .calledWith(slotDate)
      .mockResolvedValue({
        slots: [
          {
            endTime: "16:00",
            id: 0,
            name: "Slot name",
            startTime: "13:30",
          },
        ],
      });
  });

  it("Should initialize the hook with empty slots", () => {
    const { result } = renderHook(() => useSlots(slotDate, callBack));

    const { slots } = result.current;

    expect(slots).toEqual([]);
  });

  it("Should get slots when mount", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useSlots(slotDate, callBack)
    );

    await waitForNextUpdate();
    const { slots } = result.current;

    expect(slots).toEqual([
      { id: 0, label: "13:30 - 16:00", name: "Slot name" },
    ]);
  });
});
