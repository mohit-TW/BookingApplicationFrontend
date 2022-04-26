import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  lbl:{
    fontSize: "1.3em",
    padding: "0.7em 0em 0em 0em"
  },
  container: {
    display: "flex",
    //flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0em 1.8em 0em 0em"
  },
  dialogHeader: {
    fontWeight: "bold",
    padding: "0.5em 1em",
  },
  dialogContent: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5em 1em 0.5em 1.5em ",
    justifyContent: "space-between"
  },
  scheduleButtonDiv:{
    display: "flex",
    alignItems: "end",
    height: "100%",
    width: "100%",
  },
  scheduleMovieForm: {
    display: "flex",
    flexDirection: "row",
    padding: "0em 0.7em 0.7em 0em",
    marginBottom: "3em"
  },
  scheduleControl:{
    marginBottom: "2em"
  },
  scheduleButton: {
      alignSelf: "flex-end",
      marginLeft: "0.4em",
      marginBottom: "-1.5em"
      //padding: "0em 0em 0em 0.3em "
  },
  closeButton: {
    flexDirection: "row",
    //marginLeft: "350px",
    //marginTop: "8px",
  },
}));
