import { Dialog, IconButton } from "@material-ui/core";
import React from "react";
import styles from "./styles/changePasswordConfrimationStyles";
import CloseIcon from "@material-ui/icons/Close";

const ChangePasswordConfirmation = ({ open, onClose, success }) => {
  const handleClose = () => {
    //onClose();
    //history.goBack('/');
  };

  const classes = styles();

  const alertDisplay = () => {
    var alert;
    if (success) {
      alert = (
        <div className={classes.alertSuccess}>
          Success! Login with new Password
          <IconButton onClick={handleClose}>
            <CloseIcon className={classes.closeButton} />
          </IconButton>
        </div>
      );
    } else {
      alert = (
        <div className={classes.alertFailure}>
          Sorry! Failed to change password
          <CloseIcon className={classes.closeButton} onClick={handleClose} />
        </div>
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
export default ChangePasswordConfirmation;


