export const handleMovieChange = (e, scheduleMovie, setScheduleMovie,setScheduleButton) => {
  setScheduleMovie({ ...scheduleMovie, movieId: e.target.value });
  setScheduleButton(handleScheduleMovieButton(scheduleMovie));
};

export const handleSlotChange = (e, scheduleMovie, setScheduleButton) => {
  if (e.target.checked) {
    let res = [...scheduleMovie.slotIds, e.target.value];
    res = res.sort();
    scheduleMovie.slotIds = [...res];
  } else {
    let res = [];
    res = scheduleMovie.slotIds.filter((value, index) => value !== e.target.value);
    scheduleMovie.slotIds = [...res];
  }
  setScheduleButton(handleScheduleMovieButton(scheduleMovie));
};

export const handleCostChange = (e, scheduleMovie, setScheduleMovie, setScheduleButton) => {
  // setScheduleMovie({ ...scheduleMovie, cost: e.target.value });
  scheduleMovie.cost = e.target.value;
  setScheduleMovie({ ...scheduleMovie});
  setScheduleButton(handleScheduleMovieButton(scheduleMovie));
};

const handleScheduleMovieButton = (scheduleMovie) => {
  let result = true;
  if (
    scheduleMovie.movieId !== "" &&
    scheduleMovie.slotIds.length >= 1 &&
    scheduleMovie.cost !== ""
  ) {
    result = false;
  }
  console.log("result: "+result);
  return result;
};
