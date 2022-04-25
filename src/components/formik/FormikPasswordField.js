import React from "react";
import {useField} from "formik";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {TextField} from "@material-ui/core";
import styles from "./styles/formikTextFieldStyles";
import PropTypes from "prop-types";

const FormikPasswordField = (props) => {
    const classes = styles();
    const [field, meta] = useField(props.name);

    const {value, onChange, onBlur} = field;
    const {error, touched} = meta;

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            error={touched && Boolean(error)}
            helperText={touched ? error : ''}
            InputProps = {{
                endAdornment:
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                      >
                        { showPassword ? <Visibility /> : <VisibilityOff /> }
                      </IconButton>
                    </InputAdornment>
            }}
            FormHelperTextProps={{
                className: classes.helperText
            }}
            {...props}
        />
    );
};

FormikPasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default FormikPasswordField;