// export const handleMovieChange = (e, scheduleMovie, setScheduleMovie,setScheduleButton) => {
//   setScheduleMovie({ ...scheduleMovie, movieId: e.target.value });
//   setScheduleButton(handleScheduleMovieButton(scheduleMovie));
// };

export const handleSlotChange = (e, scheduleMovie, setScheduleButton) => {
  if (e.target.checked) {
    console.log("In Slot")
    let res = [...scheduleMovie.slotIds, e.target.value];
    res = res.sort();
    scheduleMovie.slotIds = [...res];
    console.log(res);
  } else {
    let res = [];
    res = scheduleMovie.slotIds.filter((value, index) => value !== e.target.value);
    scheduleMovie.slotIds = [...res];
  }
  setScheduleButton(handleScheduleMovieButton(scheduleMovie));
};


const handleScheduleMovieButton = (scheduleMovie) => {
  let result = true;
  if (
    scheduleMovie.slotIds.length >= 1
) {
    result = false;
  }
  console.log("result: "+result);
  return result;
};
