import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import Form from './components/Form';
import AlertError from './components/Alert';
import Dishs from './components/Dishs';
import Grid from '@material-ui/core/Grid'

import { submitForm } from './actions';

const mapStateToProps = state => {
  return {
    dishs: state.dishs.dishs,
    error: state.dishs.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitForm: (values) => submitForm(dispatch, values)
  }
}

class App extends Component {
render() {  
  const {dishs, error, onSubmitForm} = this.props

  return (
    <div className="App">
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{height: "100%"}}
    > 
      {error ? <AlertError postError={error}/> : ""}
      <Form onSubmit={onSubmitForm}/>
      <Dishs dishs={dishs}/>
      </Grid>
    </div>
  );
}
}

App = connect(mapStateToProps, mapDispatchToProps)(App)

export default App;
