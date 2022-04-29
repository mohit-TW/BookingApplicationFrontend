import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  dialogRoot: {
    overflow: "hidden",
    minHeight: "30vh",
    maxHeight: "80vh",
    maxWidth: "542px",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  loginButton: {
    margin: "5% auto 5% auto"
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "9%"
  },
  dialogHeader: {
    fontWeight: "bold",
    margin: "auto",
    paddingTop: "5%",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "27px",
    marginTop: "6px",
  },
  closeButton: {
    flexDirection: "row",
    marginTop: "5%",
    marginRight: "5%",
  },
  eye: {
    marginLeft: "440px",
    flexDirection: "row",
    marginTop: "-40px",
    zIndex: "2",
  },
}));
