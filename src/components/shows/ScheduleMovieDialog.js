import React, { useState } from "react";
import styles from "./styles/scheduleMovieDialogStyles";
import { Dialog, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Form, Formik } from "formik";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@material-ui/core";
import { FormikButton, FormikTextField } from "../formik";
import useMovies from "./hooks/useMovies";
import useSlots from "./hooks/useSlots";
import { initialValues } from "./services/scheduleMovieForm";
import showsService from "./services/showsService";

const ScheduleMovieDialog = ({ history,date, open, onClose }) => {
  const classes = styles();
  const handleClose = () => {
    onClose();
  };

  const [scheduledMovie, setScheduledMovie] = useState({
    movieId: "",
    slotIds: [],
    scheduleDate: date,
    cost: null,
  });

  const movies = useMovies();
  const slots = useSlots(date);

  const [errorMsg, setErrorMsg] = useState("*");

  const handleChange = (e) => {
    setScheduledMovie({ ...scheduledMovie, movieId: e.target.value });
  };

  const handleSlots = (e, id) => {
    setScheduledMovie({
      ...scheduledMovie,
      slotIds: [...scheduledMovie.slotIds, id],
    });
  };

  const handleCost = (e) => {
    const regex = new RegExp("^(?=.*[0-9]).{1,}$");
    const err = regex.test(e.target.value) ? "" : "Cost is required";
    setErrorMsg(err);
    setScheduledMovie({ ...scheduledMovie, cost: e.target.value });
  };

  const handleSubmit = async () => {
    const payloads = scheduledMovie.slotIds.map((id)=> {
        return {
            cost: scheduledMovie.cost,
            date: date,
            movieId: scheduledMovie.movieId,
            slotId: id
        }
    })

    try {
        payloads.map(async(payload,k) => {
            const response = await showsService.create(payload);
            window.location.reload(false);
            return ;
        });
    } catch (err) {
    } finally {
      onClose();
    }
  };

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
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={classes.scheduleMovieForm}>
              <FormControl fullWidth>
                <InputLabel id="movieLabel">Movies</InputLabel>
                <Select
                  labelId="movieLabel"
                  id="movieId"
                  value={scheduledMovie.movieId}
                  label="Movies"
                  onChange={handleChange}
                >
                  {movies.map((movie) => {
                    return <MenuItem value={movie.id}>{movie.name}</MenuItem>;
                  })}
                </Select>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.lbl}
                >
                  Slots
                </Typography>
                <FormGroup>
                  {slots.map((slot) => {
                    return (
                      <FormControlLabel
                        control={<Checkbox />}
                        label={slot.startTime + " - " + slot.endTime}
                        color="primary"
                        id={slot.id}
                        onChange={(e) => {
                          handleSlots(e, slot.id);
                        }}
                      />
                    );
                  })}
                </FormGroup>
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
                  label=""
                  value={scheduledMovie.cost}
                  type={"text"}
                  onChange={handleCost}
                />
                {errorMsg === "" ? null : (
                  <Typography
                    variant="body2"
                    color="primary"
                    className={classes.lbl}
                  >
                    Cost is required.
                  </Typography>
                )}
              </FormControl>
              <div className={classes.scheduleButton}>
                <FormikButton
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.scheduleButton}
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
