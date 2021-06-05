import axios from 'axios';

export const submitForm = (dispatch, values) => {
	if(values.slices_of_bread){
    values.slices_of_bread = parseInt(values.slices_of_bread);
  }
  if(values.no_of_slices) {
    values.no_of_slices = parseInt(values.no_of_slices);
    values.diameter = parseFloat(values.diameter);
  }
	axios.post('https://frosty-wood-6558.getsandbox.com/dishes', JSON.stringify(values), { headers: { 'content-type': 'application/json' }})
		.then(data => dispatch({ type: 'PUSH', payload: data.data}))
		.catch(error => dispatch({ type: 'ERROR', payload: error.message}))
}