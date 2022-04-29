import { Dialog, IconButton, Snackbar } from "@material-ui/core";
import React from "react";
import styles from "../user/styles/changePasswordConfrimationStyles";
import CloseIcon from "@material-ui/icons/Close";
import useAuth from "../layout/hooks/useAuth";
import Alert from "@material-ui/lab/Alert";

const SignupConfirmation = ({ history, open, onClose}) => {


  const handleClose = () => {
    onClose();
    history.goBack('/login');
   
  };
  

  const classes = styles();

 

  return (
    <>
      <Dialog className={classes.dialogBase} open={open} onClose={handleClose} >
      <Snackbar open={open}  onClose={handleClose} data-testid="alert" anchorOrigin={{ vertical: 'top',
          horizontal: 'center' }} >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Signup successful! 
            </Alert>
          </Snackbar>
      </Dialog>
    </>
  );
};
export default SignupConfirmation;


