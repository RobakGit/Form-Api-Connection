import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import Button from '@material-ui/core/Button'
import RenderTextField from './TextField'
import RenderTimeField from './TimeField'
import RenderNumberField from './NumberField'
import RenderSelectField from './SelectField'
import RenderSliderField from './SliderField'

import '../App.css';

const validate = values => {
  const errors = {}
  const requiredFields = [
    'name',
    'preparation_time',
    'type',
    'favoriteColor',
    'no_of_slices',
    'diameter',
    'spiciness_scale',
    'slices_of_bread'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if ( values.no_of_slices && !Number.isInteger(parseFloat(values.no_of_slices)) ) {
    errors.no_of_slices = 'required integer!'
  }
  return errors
}

let Form = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  const handleSliderChange = (event, newValue) => {
    props.change("spiciness_scale", newValue);
  };

  if(props.typeValue === "soup"){props.change("spiciness_scale", 1)};

  if(props.typeValue === "pizza"){
    props.change("spiciness_scale", undefined)
    props.change("slices_of_bread", undefined)
  } 
  else if (props.typeValue === "soup") {
    props.change("no_of_slices", undefined)
    props.change("diameter", undefined)
    props.change("slices_of_bread", undefined)
  }
  else {
    props.change("no_of_slices", undefined)
    props.change("diameter", undefined)
    props.change("spiciness_scale", undefined)
  }

  return (
      <form onSubmit={handleSubmit}>
        <div className="elementContainer">
          <Field
            name="name"
            component={RenderTextField}
            label="Dish Name"
          />
        </div>
        <div className="elementContainer">
          <Field
            name="preparation_time"
            component={RenderTimeField}
            label="Preparation Time"
          />
        </div>
        <div className="elementContainer">
          <Field
            name="type"
            component={RenderSelectField}
            label="Dish Type"
          >
            <option value="" />
            <option value={'pizza'}>Pizza</option>
            <option value={'soup'}>Soup</option>
            <option value={'sandwich'}>Sandwich</option>
          </Field>
        </div>
      
        {props.typeValue === "pizza" ? 
        <div>
          <div className="elementContainer">
          <Field
            name="no_of_slices"
            component={RenderNumberField}
            label="# of slices"
          />
        </div>
        <div className="elementContainer">
          <Field
            name="diameter"
            component={RenderNumberField}
            inputProps={{ min: "0", step: "0.1" }}
            label="diameter"
          />
        </div>
        </div> : props.typeValue === "soup" ?
        <div className="elementContainer">
        <Field
          name="spiciness_scale"
          component={RenderSliderField}
          label="spiciness scale"
          handleSliderChange={handleSliderChange}
        />
        </div> : props.typeValue === "sandwich" ? 
        <div className="elementContainer">
        <Field
          name="slices_of_bread"
          component={RenderNumberField}
          label="- number of slices of bread required"
        /> 
        </div>: ""}
        
        <div className="elementContainer">
          <Button id="subBtn" type="submit" disabled={pristine || submitting} variant="contained" color="secondary">
            Submit
          </Button>
          <Button type="button" disabled={pristine || submitting} variant="contained" onClick={reset}>
            Clear Values
          </Button>
        </div>
      </form>
  )
}

Form = reduxForm({
  form: 'Form', // a unique identifier for this form
  validate
})(Form)

const selector = formValueSelector('Form')
Form = connect(
  state => {
    const typeValue = selector(state, 'type')
    return {
      typeValue
    }
  }
)(Form)


export default Form
