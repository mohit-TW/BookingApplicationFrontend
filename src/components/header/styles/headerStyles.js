import {makeStyles} from "@material-ui/core";

export default makeStyles((theme) => ({
        headerLink: {
            color: theme.palette.primary.contrastText,
            display: 'flex',
            justifyContent: "flex-start",
            textDecoration: 'none'
        },
        logoutLink: {
            display: 'flex',
            justifyContent: "flex-end",
            alignItems: "center",
            cursor: "pointer"
        },
        cinemaLogoIcon: {
            fontSize: '2.25em'
        },
        headerLogo: {
            marginLeft: '0.15em'
        },
        toolbar: {
            display: 'flex',
            justifyContent: "space-between",
            padding: "0 4em"
        },
        cartButton: {
            color: "white",
            padding: "10px"
        },
        personProfileIcon: {
            display: 'flex',
            justifyContent: "flex-end",
            alignItems: "center",
            fontSize: '1.05em',
            padding: "0 1em"
        },
        loggedIn:{
            display: 'flex',
            justifyContent: "space-between"
        },
        profileIcon:{
            color: "white"
        }
    })
);
