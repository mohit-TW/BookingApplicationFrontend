import React, { useState } from "react";
import styles from "./styles/userProfileStyles";
import { Typography } from "@material-ui/core";
import ChangePasswordDialog from "./ChangePasswordDialog";
import { FormikButton } from "../formik";
import useUser from "./hooks/useUser";

export default () => {
  const classes = styles();

  const user = useUser();

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
          <Typography variant="h6" className={classes.lbl}>
            Username: {user.username}
          </Typography>
          {user.name === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Name:
            </Typography>
          )}
          {user.email === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Email:
            </Typography>
          )}
          {user.mobileNo === null ? null : (
            <Typography variant="h6" className={classes.lbl}>
              Mobile Number:
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
          />
          <ChangePasswordDialog
            open={showChangePasswordDialog}
            onClose={() => {
              setShowChangePasswordDialog(false);
            }}
          />
        </div>
      </div>
    </>
  );
};
