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
  ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
)

const renderTimeField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    id="time"
    label="Alarm clock"
    type="time"
    value="07:30"
    className="klasakurwa"
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    {...input}
    {...custom}
  />
)

const renderNumberField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
          id="standard-number"
          label={label}
          type="number"
          inputProps={{ min: "0" }}
          error={touched && invalid}
          helperText={touched && error}
          InputLabelProps={{
            shrink: true,
          }}
          {...input}
    {...custom}
  />
)




const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
}

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error}>
    <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
    <Select
      native
      {...input}
      {...custom}
      inputProps={{
        name: input.name,
        id: 'color-native-simple'
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
)

let App = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props

  const handleSliderChange = (event, newValue) => {
    console.log(newValue)
    props.change("spiciness_scale", newValue);
  };

  if(!props.preparation_timeValue)props.change("preparation_time", "00:00:01");
  if(!props.spicinessExist && props.typeValue === "soup"){props.change("spiciness_scale", 1)};


  const renderSliderField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
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
>    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component={renderTextField}
          label="Dish Name"
        />
      </div>
      <div>
        <Field
          name="preparation_time"
          component={renderTimeField}
          label="Dish Name"
        />
      </div>
      <div>
        <Field
          classes={classes}
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
        <div>
        <Field
          name="no_of_slices"
          component={renderNumberField}
          label="# of slices"
        />
      </div>
      <div>
        <Field
          name="diameter"
          component={renderNumberField}
          inputProps={{ min: "0", step: "0.1" }}
          label="diameter"
        />
      </div>
      </div> : props.typeValue === "soup" ? 
      <Field
        name="spiciness_scale"
        component={renderSliderField}
        label="spiciness scale"
      /> : props.typeValue === "sandwich" ? 
      <Field
        name="slices_of_bread"
        component={renderNumberField}
        label="- number of slices of bread required"
      /> : ""}
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
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
    const preparation_timeValue = selector(state, 'preparation_time')
    const typeValue = selector(state, 'type')
    return {
      typeValue,
      preparation_timeValue,
      spicinessExist
    }
  }
)(App)


export default App