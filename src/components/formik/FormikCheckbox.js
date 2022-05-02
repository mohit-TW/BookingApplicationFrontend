import { FormControlLabel, FormGroup, Checkbox } from "@material-ui/core";
//import { useField } from "formik";
import React from 'react';

const FormikCheckbox = (props) => {
  //const [field] = useField(props.name);
  //const { onChange } = field;
  const { options, onChange, color, ...otherProps } = props;

  return (
    <FormGroup>
      {options.map((option,k) => {
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={option.label}
            color={color}
            value={option.id}
            id={option.id}
            key={k}
            onChange={onChange}
            {...otherProps}
          />
        );
      })}
    </FormGroup>
  );
};

export default FormikCheckbox;
