import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  dialogRoot: {
    overflow: "hidden",
    minHeight: "30vh",
    maxHeight: "80vh",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
  },
  loginButton: {
    marginTop: "15px",
    marginRight: "300px",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  dialogHeader: {
    fontWeight: "bold",
    padding: "10px 0px 0px 10px",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "27px",
    marginTop: "6px",
  },
  closeButton: {
    flexDirection: "row",
    marginLeft: "350px",
    marginTop: "8px",
  },
  eye: {
    marginLeft: "440px",
    flexDirection: "row",
    marginTop: "-40px",
    zIndex: "2",
  },
}));
