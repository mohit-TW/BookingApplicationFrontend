import React, { useEffect, useState } from "react";
import styles from "./styles/userProfileStyles";
import { Typography } from "@material-ui/core";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { FormikButton } from "../formik";
import useUser from "./hooks/useUser";

export default ({history,location, isAuthenticated}) => {
  const classes = styles();
  const {user,getDetails, error} = useUser();
  if(user.username && !user.name && !error){
    getDetails(user.username).then()
  }

  const [showChangePasswordDialog, setShowChangePasswordDialog] =
    useState(false);
  return (
    <>
      
      <div className={classes.userProfile}>
        <div className={classes.cardHeader}>
          <Typography variant="h4" className={classes.userHeader}>
            User Profile
          </Typography>
        </div>
        <div>
          {user.name === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Name: {user.name}
            </Typography>
          )}
          <Typography variant="h6" className={classes.lbl} data-testid="username">
            Username: {user.username}
          </Typography>
          {user.dob === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Date of Birth: {user.dob}
            </Typography>
          )}
          {user.email === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Email: {user.email}
            </Typography>
          )}
          {user.mobileNo === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Mobile Number: {user.mobileNo}
            </Typography>
          )}
          <FormikButton
            variant="contained"
            color="primary"
            onClick={() => {
              setShowChangePasswordDialog(true);
            }}
            className={classes.Btn}
            name="CHANGE PASSWORD"
            data-testid="button-1"

          />
          <ChangePasswordDialog
            open={showChangePasswordDialog}
            onClose={() => {
              setShowChangePasswordDialog(false);
            }}
            history={history}
            location={location}
            isAuthenticated = {isAuthenticated}
          />
        </div>
      </div>
    </>
  );
};
