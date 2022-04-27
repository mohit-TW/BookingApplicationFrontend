import { when } from "jest-when";
import slotsService from './slotsService'
import apiService from "../../../helpers/apiService";

jest.mock('../../../helpers/apiService');

describe('Slot Service', () => {

    it('should return all available slots', async () => {
        const data = [{
            id: 1,
            name: "slot1",
            startTime: "9:00 AM",
            endTime: "12:30 PM"
        },
        {
            id: 2,
            name: "slot2",
            startTime: "1:30 PM",
            endTime: "5:00 PM"
        }]

        apiService.get.mockResolvedValue({ data: data });
        const slots = await slotsService.fetchSlots();

        expect(slots).toHaveLength(2);

        expect(slots).toEqual([{
            id: 1,
            name: "slot1",
            startTime: "9:00 AM",
            endTime: "12:30 PM"
        },
        {
            id: 2,
            name: "slot2",
            startTime: "1:30 PM",
            endTime: "5:00 PM"
        }]);
    });
});
