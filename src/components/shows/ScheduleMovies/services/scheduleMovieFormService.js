import { object, string, ref, boolean, array } from "yup";

export const initialValues = (date,first) => {
  return {
    movieId: first,
    slotIds: [],
    date: date,
    cost: "",
  };
};
export const formSchema = object({
  movieId: string("Select a movie").required('Movie is required'),
  cost: string('Enter the cost for the movie').required('Cost is required'),
});