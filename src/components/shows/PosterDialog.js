import React from "react";
import {Dialog} from "@material-ui/core";
import PropTypes from "prop-types";


const PosterDialog = ({posterLink, open, onClose}) => {
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} >
            <div>
            <img src = {posterLink} alt="Poster"/>
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