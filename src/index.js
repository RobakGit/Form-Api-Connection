import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import axios from 'axios';
import * as serviceWorker from './serviceWorker';

const App = require('./App').default

const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})

const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)

const showResults = values =>
  new Promise(resolve => {
      
      if(values.slices_of_bread){
        values.slices_of_bread = parseInt(values.slices_of_bread);
      }
      if(values.no_of_slices) {
        values.no_of_slices = parseInt(values.no_of_slices);
        values.diameter = parseFloat(values.diameter);
      }

      axios.post('https://frosty-wood-6558.getsandbox.com/dishes', JSON.stringify(values, null, 2), {
      headers: {
      'content-type': 'application/json'
      }
      })
      .then((response) => {
        alert(`Server data Response:\n${JSON.stringify(response.data, null, 2)}`);
      })
      .catch((error) => {
        alert(error);
      });

      resolve()
  })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App onSubmit={showResults}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
