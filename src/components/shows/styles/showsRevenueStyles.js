import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        showsRevenueContainer: {
            padding: "15px 15px 0px 0px",
            display: "flex",
            alignSelf: "center",
            color: "green",
            fontWeight: "bold",
            fontSize: "1.8em"
        },
        showsRevenueLoadingSpinner: {
            padding: "15px"
        }
    })
);
