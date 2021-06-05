import React from 'react';
import TextField from '@material-ui/core/TextField'

const RenderTextField = ({ label, input, meta: { touched, invalid, error } }) => {
  return (
    <TextField
      label={label}
      placeholder={label}
      variant="outlined"
      error={touched && invalid}
      helperText={touched && error}
      {...input}
    />
  );
}

export default RenderTextField;