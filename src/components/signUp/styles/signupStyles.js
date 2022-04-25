import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  signupContainer: {
    display: "flex",
    justifyContent: "center",
    padding: "20px 40px",
  },
  signupForm: {
    display: "flex",
    flexDirection: "column",
  },
  signupButton: {
    marginTop: "15px",
  },
  signupErrorMessage: {
    marginTop: "8px",
  },
}));
