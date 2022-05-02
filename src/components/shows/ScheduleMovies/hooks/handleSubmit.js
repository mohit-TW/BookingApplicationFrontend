import showsService from "../../services/showsService";
export const handleSubmit = async (
  values,
  onClose,
  setStatus,
  setMessage,
  setShowScheduleMovieConfirmation
) => {
  const payloads = values.slotIds.map((id) => {
    return {
      cost: values.cost,
      date: values.date,
      movieId: values.movieId,
      slotId: Number(id),
    };
  });
  try {
    payloads.map(async (payload, k) => {
      const response = await showsService.create(payload);
      return;
    });
    setStatus(1);
    setMessage("Success! Movie Scheduled");
  } catch (err) {
    setStatus(0);
    setMessage("Error! Cannot schedule the movie/s");
  } finally {
    setShowScheduleMovieConfirmation(true);
    onClose();
  }
};
