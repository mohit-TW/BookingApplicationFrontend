import { Dialog, IconButton, Snackbar } from "@material-ui/core";
import React from "react";
import styles from "./styles/changePasswordConfrimationStyles";
import CloseIcon from "@material-ui/icons/Close";
import useAuth from "../layout/hooks/useAuth";
import Alert from "@material-ui/lab/Alert";
const ChangePasswordConfirmation = ({ history, open, onClose, location, success }) => {

  const { isAuthenticated, handleLogin, handleLogout } = useAuth();

  const handleClose = () => {
    onClose();
    handleLogout().then(() => {
      window.location.assign('/login');
    });
    
  };
  

  const classes = styles();

  const alertDisplay = () => {
    var alert;
    if (success===1) {
      alert = (
          
          <Snackbar open={open}  onClose={handleClose} data-testid="alert" anchorOrigin={{ vertical: 'top',
          horizontal: 'center' }}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Success! Login with new password
            </Alert>
          </Snackbar>
      );
    } else if(success==0){
      alert = (
        <Snackbar open={open}  onClose={handleClose} data-testid="alert" anchorOrigin={{ vertical: 'top',
        horizontal: 'center', }}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Sorry! Failed to change password
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
export default ChangePasswordConfirmation;


