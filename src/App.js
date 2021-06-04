import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import './App.css';


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

const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
}) => (
  <TextField
    label={label}
    placeholder={label}
    variant="outlined"
    error={touched && invalid}
    helperText={touched && error}
    {...input}
  />
)

const renderTimeField = ({
  label,
  input,
  meta: { touched, invalid, error },
}) => (
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
      step: 2,
    }}
    {...input}
  />
  {renderFromHelper({ touched, error })}
  </FormControl>
)

const renderNumberField = ({
  label,
  input,
  meta: { touched, invalid, error },
}) => (
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

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } 
  else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
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
    {renderFromHelper({ touched, error })}
  </FormControl>
)

let App = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  const handleSliderChange = (event, newValue) => {
    props.change("spiciness_scale", newValue);
  };

  if(!props.spicinessExist && props.typeValue === "soup"){props.change("spiciness_scale", 1)};

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


  const renderSliderField = ({
    label,
    input,
    meta: { touched, invalid, error },
}) => (
  <Slider
    min={1}
    max={10}
    defaultValue={1}
    marks
    valueLabelDisplay="auto"
    onChange={handleSliderChange}
    aria-labelledby="input-slider"
  />
)
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{height: "100%"}}
    > 
      <form onSubmit={handleSubmit}>
        <div className="elementContainer">
          <Field
            name="name"
            component={renderTextField}
            label="Dish Name"
          />
        </div>
        <div className="elementContainer">
          <Field
            name="preparation_time"
            component={renderTimeField}
            label="Preparation Time"
          />
        </div>
        <div className="elementContainer">
          <Field
            name="type"
            component={renderSelectField}
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
            component={renderNumberField}
            label="# of slices"
          />
        </div>
        <div className="elementContainer">
          <Field
            name="diameter"
            component={renderNumberField}
            inputProps={{ min: "0", step: "0.1" }}
            label="diameter"
          />
        </div>
        </div> : props.typeValue === "soup" ?
        <div className="elementContainer">
        <Field
          name="spiciness_scale"
          component={renderSliderField}
          label="spiciness scale"
        />
        </div> : props.typeValue === "sandwich" ? 
        <div className="elementContainer">
        <Field
          name="slices_of_bread"
          component={renderNumberField}
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
    </Grid>
  )
}

App = reduxForm({
  form: 'App', // a unique identifier for this form
  validate
})(App)

const selector = formValueSelector('App')
App = connect(
  state => {
    // can select values individually
    const spicinessValue = selector(state, 'spiciness_scale')
    let spicinessExist = false;
    if(spicinessValue){spicinessExist = true;}
    const typeValue = selector(state, 'type')
    return {
      typeValue,
      spicinessExist
    }
  }
)(App)


export default App