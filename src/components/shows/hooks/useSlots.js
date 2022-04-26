import { useEffect, useState } from "react";
import slotsService from "../services/slotsService";

const useSlots = (date) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    slotsService.fetchSlots(date).then((slot) => {
        const availSlots =
      slot.slots.map((obj) => {
            return {
                id: obj.id,
                startTime: obj.startTime,
                endTime: obj.endTime,
                name: obj.name,
            }
      });
      setSlots(availSlots);
    });
    // eslint-disable-next-line
  }, [slots]);

  return slots;
};

export default useSlots;
