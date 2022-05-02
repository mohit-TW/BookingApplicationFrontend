import React from "react";
import PropTypes from "prop-types";
import { FormControl, Button } from "@material-ui/core";

const FormikButton = (props) => {

  return (
    <FormControl>
      <Button
        variant={props.variant}
        type={props.type}
        color={props.color}
        onClick={props.onClick}
        {...props}
      >
        {props.name}
      </Button>
    </FormControl>
  );
};

FormikButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default FormikButton;
