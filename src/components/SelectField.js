import React from 'react';
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import RenderFormHelper from './FormHelper'

const RenderSelectField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <FormControl error={touched && error}>
    <InputLabel style={{marginLeft: "10px"}} htmlFor="dish-type">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        id: 'dish-type'
      }}
      variant="outlined"
    >
    </Select>
    <RenderFormHelper touched={touched} error={error} />
  </FormControl>
)

export default RenderSelectField;