import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        dialogRoot: {
            overflow: "hidden",
            minHeight: "30vh",
            maxHeight: "80vh"
        },
        container: {
            display: "flex",
            flexDirection: "column",
            padding: "0 5px"
        },
        dialogHeader: {
            fontWeight: "bold",
            padding: "10px 0px 10px 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        dialogContent: {
            display: "flex",
            flexDirection: "row",
            marginLeft: "1%"
        },
        moviePicture: {
            justifyContent: "center",
            minWidth: "15%",
            marginLeft: "9px",
            marginRight: "9px"
        },
        imdbRating:{
           color: '#545454',
           fontWeight: "lighter",
           fontSize: '0.8em'
        },
        moviePlot:{
            color: '#545454',
            fontWeight: "normal",
            fontSize: '0.8em'
        },

        dialogMain: {
            display: "flex",
            padding: "0px 20px 20px 0px",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: "75%",
            maxWidth: "78%",
            marginLeft: "6%"
        },
        movieMarquee: {
            fontWeight: "bold"
        },
        seatsAndAmount: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            maxWidth: "33%"
        },
        seatsSelector: {
            maxWidth: "30%"
        },
        dialogBottom: {
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "20px 0px 0px 0px"
        },
        dialogButton: {
            marginLeft: "15px"
        },

        moviePosterDialogbox: {
                width: "130%",
                height: "90%",

        }
    })
);
