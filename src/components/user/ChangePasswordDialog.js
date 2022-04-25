import React, { useState } from "react";
import { Typography, Dialog, IconButton } from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles/changePasswordDialogStyles";
import { Form, Formik } from "formik";
import { FormikTextField, FormikButton } from "../formik";
import CloseIcon from "@material-ui/icons/Close";
import changePasswordService from "./services/changePasswordService";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ChangePasswordConfirmation from "./ChangePasswordConfirmation";

const ChangePasswordDialog = ({ open, onClose }) => {

  const [showChangePasswordConfirmation, setShowChangePasswordConfirmation] = useState(false);
  const [status, setStatus] = useState(false);

  const handleClose = () => {
    setPasswordObjectList({
      oldPasswordObject: {
        shown: false,
        value: "",
      },
      newPasswordObject: {
        shown: false,
        value: "",
      },
      confirmNewPasswordObject: {
        shown: false,
        value: "",
      },
    })
    onClose();
  };

  const [isChangePasswordButtonDisabled, setIsChangePasswordButtonDisabled] =
    useState(true);

  const [passwordObjectList, setPasswordObjectList] = useState({
    oldPasswordObject: {
      shown: false,
      value: "",
    },
    newPasswordObject: {
      shown: false,
      value: "",
    },
    confirmNewPasswordObject: {
      shown: false,
      value: "",
    },
  });

  const [errorMsgObj, setErrorMsgObj] = useState({
    patternMismatch: null,
    passwordMismatch: null,
    newPasswordIsSameAsOldPassword: null,
  });

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };


  const handleSubmit = async () => {
    const payload = {
      oldPassword: passwordObjectList.oldPasswordObject.value,
      newPassword: passwordObjectList.newPasswordObject.value,
      confirmNewPassword: passwordObjectList.confirmNewPasswordObject.value,
    };

    let response;
    try {
       response = await changePasswordService.create(payload);
      //alert(" Password changed successfully !! ");
      //console.log("RESP: "+response.data.json());
      //console.log(response.status);
      setShowChangePasswordConfirmation(true);
      setStatus(true);
    } catch (err) {
      alert(" Old Password is wrong !! ");
      setStatus(false);
    } finally {
      console.log(response);
      onClose();
    }
  };

  const handlePatterMismatch = (e) => {
    const exp = new RegExp(
      "^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).{8,64}$"
    );
    let data = e.target.value;
    let val = exp.test(data) ? "" : "Pattern mismatch";
    return val;
  };

  const handleNewPasswordIsSameAsOldPassword = (e) => {
    let val =
      passwordObjectList.oldPasswordObject.value === e.target.value
        ? "New Password is Equal to Old Password"
        : "";
    return val;
  };

  const handlePasswordMismatch = (e) => {
    let val =
      passwordObjectList.newPasswordObject.value !== e.target.value
        ? "Confirm password not equal to new password"
        : "";
    val === ""
      ? setIsChangePasswordButtonDisabled(false)
      : setIsChangePasswordButtonDisabled(true);
    return val;
  };

  const classes = styles();

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
          <Typography variant="h6" className={classes.dialogHeader}>
            Change Password
            <CloseIcon className={classes.closeButton} onClick={handleClose} />
          </Typography>
        </div>

        <div className={classes.dialogContent}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className={classes.loginForm}>
              <FormikTextField
                required
                margin="dense"
                name="oldPassword"
                label="Old Password"
                value={passwordObjectList.oldPasswordObject.value}
                type={
                  passwordObjectList.oldPasswordObject.shown
                    ? "text"
                    : "password"
                }
                onChange={(e) =>
                  setPasswordObjectList({
                    ...passwordObjectList,
                    oldPasswordObject: {
                      ...passwordObjectList.oldPasswordObject,
                      value: e.target.value,
                    },
                  })
                }
              />
              <IconButton
                className={classes.eye}
                onClick={() => {
                  setPasswordObjectList({
                    ...passwordObjectList,
                    oldPasswordObject: {
                      ...passwordObjectList.oldPasswordObject,
                      shown: !passwordObjectList.oldPasswordObject.shown,
                    },
                  });
                }}
              >
                {passwordObjectList.oldPasswordObject.shown ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>

              <FormikTextField
                required
                type={
                  passwordObjectList.newPasswordObject.shown
                    ? "text"
                    : "password"
                }
                margin="dense"
                name="newPassword"
                label="New Password"
                disabled={
                  passwordObjectList.oldPasswordObject.value === ""
                    ? true
                    : false
                }
                value={passwordObjectList.newPasswordObject.value}
                onChange={(e) => {
                  //setErrorMsgPatternMismatch(handleValidation(e));
                  setPasswordObjectList({
                    ...passwordObjectList,
                    newPasswordObject: {
                      ...passwordObjectList.newPasswordObject,
                      value: e.target.value,
                    },
                  });
                  setErrorMsgObj({
                    ...errorMsgObj,
                    newPasswordIsSameAsOldPassword:
                      handleNewPasswordIsSameAsOldPassword(e),
                    patternMismatch: handlePatterMismatch(e),
                  });
                }}
              />
              <IconButton
                className={classes.eye}
                onClick={() => {
                  setPasswordObjectList({
                    ...passwordObjectList,
                    newPasswordObject: {
                      ...passwordObjectList.newPasswordObject,
                      shown: !passwordObjectList.newPasswordObject.shown,
                    },
                  });
                }}
              >
                {passwordObjectList.newPasswordObject.shown ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>

              <Typography variant="body1" color="error">
                {errorMsgObj.patternMismatch}
                {errorMsgObj.newPasswordIsSameAsOldPassword}
              </Typography>

              <FormikTextField
                required
                type={
                  passwordObjectList.confirmNewPasswordObject.shown
                    ? "text"
                    : "password"
                }
                margin="dense"
                name="confirmNewPassword"
                label="Confirm Password"
                disabled={
                  errorMsgObj.newPasswordIsSameAsOldPassword !== ""
                    ? true
                    : errorMsgObj.patternMismatch !== ""
                    ? true
                    : false
                }
                value={passwordObjectList.confirmNewPasswordObject.value}
                onChange={(e) => {
                  //setErrorMsgPasswordMismatch(handlePasswordMatch(e));
                  setErrorMsgObj({
                    ...errorMsgObj,
                    passwordMismatch: handlePasswordMismatch(e),
                  });
                  setPasswordObjectList({
                    ...passwordObjectList,
                    confirmNewPasswordObject: {
                      ...passwordObjectList.confirmNewPasswordObject,
                      value: e.target.value,
                    },
                  });
                }}
              />
              <IconButton
                className={classes.eye}
                onClick={() => {
                  setPasswordObjectList({
                    ...passwordObjectList,
                    confirmNewPasswordObject: {
                      ...passwordObjectList.confirmNewPasswordObject,
                      shown: !passwordObjectList.confirmNewPasswordObject.shown,
                    },
                  });
                }}
              >
                {passwordObjectList.confirmNewPasswordObject.shown ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
              <Typography variant="body1" color="error">
                {errorMsgObj.passwordMismatch}
              </Typography>
              <FormikButton
                variant="contained"
                type="submit"
                color="primary"
                disabled={isChangePasswordButtonDisabled}
                className={classes.loginButton}
                name="CHANGE PASSWORD"
              />
            </Form>
          </Formik>
        </div>
      </Dialog>
      <ChangePasswordConfirmation open={showChangePasswordConfirmation}
        onClose={() => {handleClose();
                        setShowChangePasswordConfirmation(false);
                      setStatus(false);}}
        success={status}
        />
    </>
  );
};

ChangePasswordDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ChangePasswordDialog;
