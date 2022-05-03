import { useEffect, useState } from "react";
import slotsService from "../services/slotsService";

const useSlots = (date, setScheduleMovieBtnDisable) => {
  const [slots, setSlots] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    slotsService.fetchSlots(date).then((slot) => {
      setAvailableSlots([...availableSlots, slot]);
      if(slot.slots !== undefined){
        assignSlots(slot);
      }
    });
    // eslint-disable-next-line
  }, []);

  const assignSlots = (slot) =>{
    const availSlots = slot.slots.map((obj) => {
      const temp = {
        id: obj.id,
        label: obj.startTime + " - " + obj.endTime,
        name: obj.name,
      };
      return temp;
    });
    //console.log("avail: "+ availSlots.length);
    if (availSlots.length !== 0) setSlots(availSlots);
    else setScheduleMovieBtnDisable(true);
  }

  return {
    slots: slots,
  };
};

export default useSlots;
