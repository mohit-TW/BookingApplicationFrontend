import React from "react";
import {Dialog, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import styles from "./styles/posterDialogStyles.js";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const PosterDialog = ({posterLink, name, open, onClose}) => {
    const handleClose = () => {
        onClose();
    };
    const classes = styles();

    return (
        <>
            <Dialog open={open} onClose={handleClose} data-testid="enlarged-poster">
            <div className={classes.posterContainer}>
                <div className={classes.container}>
                    <Typography variant="h6" className={classes.posterHeader}>
                        <div className={classes.posterTitle} data-testid="poster-title">
                            {name}
                        </div>
                        <IconButton className={classes.posterExitButton} onClick={handleClose} data-testid="close-button">
                            <CloseIcon />
                         </IconButton>
                    </Typography>
                <img src = {posterLink} alt={name + " Poster"} data-testid="movie-poster" className={classes.image}/>
                </div>
            </div>
            </Dialog>
        </>
   );
}

PosterDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
export default PosterDialog;