import React from 'react';
import FormHelperText from '@material-ui/core/FormHelperText'

const RenderFormHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return ""
  } 
  else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

export default RenderFormHelper;