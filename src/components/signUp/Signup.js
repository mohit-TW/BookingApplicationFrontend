import React, { useState } from "react";
import { Form, Formik } from "formik";
import { FormikTextField } from "../formik";
import { Button } from "@material-ui/core";
import styles from "./styles/signupStyles";
import {
  formSchema,
  initialValues,
} from "./services/signupFormService";
import useSignup from "./hooks/useSignup";
import FormikPasswordField from "../formik/FormikPasswordField";
import FormikDateField from "../formik/FormikDateField";
import SignupConfirmation from "./SignupConfirmation";

const Signup = ({ history }) => {
  const classes = styles();
  
 const {errorMessage, handleSignup, success, showError, phoneError,dobError} = useSignup();
 const [showSignupConfirmation, setShowSignupConfirmation] = useState(false);

 const handleSubmit = (values) => {
      handleSignup(values,history);
      setShowSignupConfirmation(success);

 }
  return (
    <div className={classes.signupContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        <Form className={classes.signupForm}>
          <FormikTextField required margin="dense" name="name" label="Name" data-testid = "name"/>
          <FormikTextField
            required
            margin="dense"
            name="username"
            label="User Name"
            data-testid = "username"
          />
          {showError ? errorMessage():''}
          <FormikDateField
            required
            margin="dense"
            name="dob"
            label="Date of Birth"
            data-testid = "dob"
          />
          {dobError? errorMessage() : ''}
          <FormikTextField required margin="dense" name="email" label="Email" data-testid = "email" />
          <FormikTextField
            required
            margin="dense"
            name="phoneNumber"
            label="Mobile Number"
            data-testid = "mobileNumber"
          />
          {phoneError? errorMessage() : ''}
          <FormikPasswordField
            required
            margin="dense"
            name="password"
            label="Password"
            data-testid = "password"
          />
          <FormikPasswordField
            required
            margin="dense"
            name="confirmPassword"
            label="Confirm Password"
            data-testid = "confirmPassword"
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className={classes.signupButton}
            data-testid = "submit"
          >
            Sign Up
          </Button>
          <SignupConfirmation history={history} open={success} onClose={() => {
              setShowSignupConfirmation(false);
            }} />
        </Form>
      </Formik>
      
    </div>
  );
}

export default Signup;