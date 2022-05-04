import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) =>
({
    posterContainer: {
        minWidth: "53vh",
        minHeight: "30vh",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "0px 10px 10px 10px",
        margin: "0px 15px 15px 15px"

    },
    posterHeader: {
        fontWeight: "bold",
        padding: " 10px 0px 10px 50px;",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    posterTitle: {
        justifySelf: "center",
        marginLeft: "auto"
    },
    posterExitButton: {
        marginLeft: "auto",
        padding: "0px"
    },
    image: {
        width: "30em",
        height: "33em",
    }
})
);
