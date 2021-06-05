import React from 'react';
import Slider from '@material-ui/core/Slider'
import InputLabel from '@material-ui/core/InputLabel'

const RenderSliderField = ({ label, input, handleSliderChange, meta: { touched, invalid, error }}) => (
  <>
  <InputLabel style={{marginLeft: "10px"}} htmlFor="dish-type">{label}</InputLabel>
  <Slider
    min={1}
    max={10}
    defaultValue={1}
    marks
    valueLabelDisplay="auto"
    onChange={handleSliderChange}
  />
  </>
)

export default RenderSliderField;