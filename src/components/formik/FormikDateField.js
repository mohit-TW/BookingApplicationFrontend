import React, {useState} from "react";
import {useField} from "formik";
import {TextField} from "@material-ui/core";
import styles from "./styles/formikTextFieldStyles";
import PropTypes from "prop-types";
import moment from "moment";
      
const FormikDateField = (props) => {
    const classes = styles();
    const [field, meta] = useField(props.name);
    const [focus, setFocused] = useState(false);  
    const {value, onChange, onBlur} = field;
    const {error, touched} = meta;
    const onFocus = () => setFocused(true);

    return(
        <TextField
        id="date"
        type={value || focus? "date":"text"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus = {onFocus}
        error={touched && Boolean(error)}
        helperText={touched ? error : ''}
        FormHelperTextProps={{
            className: classes.helperText
        }}
        InputProps={{
            classes: {
              input: "CustomTextField"
            }
        }}
        InputLabelProps={Boolean(error) && {shrink: true}}
        {...props}  
        defaultValue={value!=="" ? moment(value).format('yyyy-MM-DD') : ""}
      />
    )

}

export default FormikDateField;
      