import showsService from '../../services/showsService';
export const handleSubmit = async (values, onClose) => {
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
    window.location.reload(false);
  } catch (err) {
  } finally {
    onClose();
  }
};
