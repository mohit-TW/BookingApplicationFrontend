import { Dialog, Snackbar } from "@material-ui/core";
import React from "react";
import styles from "./styles/scheduleMovieConfirmationStyles";
import Alert from "@material-ui/lab/Alert";
const ScheduleMovieConfirmation = ({ open, onClose, success, message }) => {
  const handleClose = () => {
    onClose();
  };
  const classes = styles();

  const alertDisplay = () => {
    var alert;
    if (success===1) {
      alert = (
          
          <Snackbar open={open}  onClose={handleClose} data-testid="alert" anchorOrigin={{ vertical: 'top',
          horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
      );
    } else if(success===0){
      alert = (
        <Snackbar open={open}  onClose={handleClose} data-testid="alert" anchorOrigin={{ vertical: 'top',
        horizontal: 'center', }}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
            </Alert>
          </Snackbar>
      );
    }
    return alert;
  };

  return (
    <>
      <Dialog className={classes.dialogBase} open={open} onClose={handleClose}>
        {alertDisplay()}
      </Dialog>
    </>
  );
};
export default ScheduleMovieConfirmation;


