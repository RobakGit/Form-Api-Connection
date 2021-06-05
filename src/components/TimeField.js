import React from 'react';
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import RenderFormHelper from './FormHelper'

const RenderTimeField = ({ label, input, meta: { touched, invalid, error } }) => (
<FormControl error={touched && error}>
  <TextField
    id="time"
    label={label}
    type="time"
    variant="outlined"
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 2
    }}
    {...input}
  />
  <RenderFormHelper touched={touched} error={error} />
  </FormControl>
)

export default RenderTimeField;