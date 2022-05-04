import { object, string, ref, boolean, array, number} from "yup";

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
  cost: number('Enter the cost for the movie').required('Cost is required').min(1,"Cost cannot be negative").max(999,"Cost cannot exceed 1000"),
});