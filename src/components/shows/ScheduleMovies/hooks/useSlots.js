import { useEffect, useState } from "react";
import slotsService from "../services/slotsService";

const useSlots = (date, fn) => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    slotsService.fetchSlots(date).then((slot) => {
        const availSlots =
      slot.slots.map((obj) => {
            const temp = {
                id: obj.id,
                label: obj.startTime+" - "+obj.endTime,
                name: obj.name,
            }
            return temp;
      });
      //console.log("avail: "+ availSlots.length);
      if(availSlots.length !== 0) setSlots(availSlots);
      else fn(true);
    });
    // eslint-disable-next-line
  }, []);

  return {
    slots:slots,
  };
};

export default useSlots;
