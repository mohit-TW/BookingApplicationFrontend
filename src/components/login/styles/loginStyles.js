import {makeStyles} from "@material-ui/core/styles";

export default makeStyles((theme) =>
    ({
        loginContainer: {
            display: "flex",
            justifyContent: "center",
            padding: "20px 40px"
        },
        loginForm: {
            display: "flex",
            flexDirection: "column"
        },
        loginButton: {
            marginTop: "15px"
        },
        loginErrorMessage: {
            marginTop: "8px"
        },
        signupLink : {
            marginTop: "12px",
        },
        link: {
            textDecoration: "none",
            color: '#9254C8',
            fontWeight: "500",
        },
        newUserText : {
            color: "black",
            marginRight: "5px",
        }
    })
);
