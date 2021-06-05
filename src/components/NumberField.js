import React from 'react';
import TextField from '@material-ui/core/TextField'

const RenderNumberField = ({ label, input, meta: { touched, invalid, error } }) => (
  <TextField
    id="standard-number"
    label={label}
    type="number"
    variant="outlined"
    inputProps={{ min: "0" }}
    error={touched && invalid}
    helperText={touched && error}
    InputLabelProps={{
      shrink: true,
    }}
    {...input}
  />
)

export default RenderNumberField;