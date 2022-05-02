import React, { useState } from "react";
import styles from "./styles/scheduleMovieDialogStyles";
import { Dialog, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Form, Formik } from "formik";
import { FormControl } from "@material-ui/core";
import {
  FormikButton,
  FormikCheckbox,
  FormikSelect,
  FormikTextField,
} from "../../formik";
import useMovies from "./hooks/useMovies";
import useSlots from "./hooks/useSlots";
import { initialValues, formSchema } from "./services/scheduleMovieFormService";
import { handleSubmit } from "./hooks/handleSubmit";
import {
  handleMovieChange,
  handleSlotChange,
  handleCostChange,
} from "./hooks/handleChanges";

const ScheduleMovieDialog = ({ date, open, onClose, setBtnDisable }) => {
  const classes = styles();
  const handleClose = () => {
    setScheduledMovie(initialValues(date));
    setScheduledMovie({...scheduledMovie, movieId: movies[0].value});
    setScheduleButtonDisable(true);
    onClose();
  };
  const [scheduledMovie, setScheduledMovie] = useState(initialValues(date));
  const [scheduleButtonDisable, setScheduleButtonDisable] = useState(true);
  const { movies } = useMovies(scheduledMovie);
  const { slots } = useSlots(date, setBtnDisable);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        classes={{
          paper: classes.dialogRoot,
        }}
      >
        <div className={classes.container}>
          <Typography variant="h5" className={classes.dialogHeader}>
            Schedule Movie
          </Typography>
          <CloseIcon className={classes.closeButton} onClick={handleClose} />
        </div>
        <div className={classes.dialogContent}>
          <Formik initialValues={scheduledMovie} validationSchema={formSchema} >
            <Form className={classes.scheduleMovieForm}>
              <FormControl fullWidth>
                <FormikSelect
                  id="movieId"
                  name="movieId"
                  dropdownLabel={"Movies"}
                  options={movies}
                  value={scheduledMovie.movieId}
                  onChange={(e) => {
                    handleMovieChange(e, scheduledMovie, setScheduledMovie, setScheduleButtonDisable);
                  }}
                />
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.lbl}
                >
                  Slots
                </Typography>
                <FormikCheckbox
                  options={slots}
                  color="primary"
                  name="slotIds"
                  onChange={(e) =>
                    handleSlotChange(e, scheduledMovie,setScheduleButtonDisable)
                  }
                />
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.lbl}
                >
                  Cost
                </Typography>
                <FormikTextField
                  required
                  margin="dense"
                  name="cost"
                  label="Cost"
                  type="number"
                  autoComplete="off"
                  value={scheduledMovie.cost}
                  onChange={(e) =>
                    handleCostChange(e, scheduledMovie, setScheduledMovie,setScheduleButtonDisable)
                  }
                />
              </FormControl>
              <div className={classes.scheduleButton}>
                <FormikButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.scheduleButton}
                  disabled={scheduleButtonDisable}
                  onClick={() => {
                    handleSubmit(scheduledMovie, onClose);
                  }}
                  name="SCHEDULE"
                />
              </div>
            </Form>
          </Formik>
        </div>
      </Dialog>
    </>
  );
};

export default ScheduleMovieDialog;
