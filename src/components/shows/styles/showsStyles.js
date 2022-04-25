import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        cardHeader: {
            display: "flex",
            justifyContent: "space-between"
        },
        showContainer: {
            "& :hover": {
                backgroundColor: "#f9f8fd",
            }
        },
        localMoviesIcon: {
            "& :hover": {
                backgroundColor: "#bdbdbd",
            }
        },
        showsHeader: {
            padding: "15px 0 0 15px",
            display: "flex",
            fontWeight: "bold",
            alignSelf: "center"
        },
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
        listRoot: {
            width: '100%',
            backgroundColor: theme.palette.background.paper
        },
        listItem: {
            alignSelf: 'center',
        },
        price: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        slotTime: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        imdbRating:{
            color: '#bebebe'
        },
        buttons: {
            display: "flex",
            justifyContent: 'space-between'
        },
        navigationButton: {
            margin: "20px"
        },
        paper: {
            width: '200',
            height: '500',
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        moviePoster: {
            width: "60px",
            height: "75px",
            margin: "7px",
        }
    })
);
