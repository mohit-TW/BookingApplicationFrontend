import React from "react";
import PropTypes from "prop-types";
import { FormControl, Button } from "@material-ui/core";
//import { useField } from "formik";

const FormikButton = (props) => {
    //const [field] = useField(props.name);
    //const {onClick} = field;

    const {className, options, id,} = props;

  return (
    <FormControl>
      <Button /*data-testid={props.id}*/
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
