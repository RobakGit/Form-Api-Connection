import React from 'react';
import Grid from '@material-ui/core/Grid'

const Dish = ({id, type, name, preparation_time, no_of_slices, diameter, spiciness_scale, slices_of_bread}) => {
	if(type === "pizza"){
		return (
			<Grid
      	container
      	justify="center"
      	alignItems="center"
    	>
				<div id={id} className="dish"> 
					<p><b>Dish name:</b> {name}</p>
					<p><b>Preparation time:</b> {preparation_time}</p>
					<p><b>Number of slices:</b> {no_of_slices}</p>
					<p><b>Diameter:</b> {diameter}</p>
				</div>
			</Grid>
		);
	}
	else if(type === "soup"){
		return (
			<Grid
      	container
      	justify="center"
      	alignItems="center"
    	>
				<div id={id} className="dish"> 
					<p><b>Dish name:</b> {name}</p>
					<p><b>Preparation time:</b> {preparation_time}</p>
					<p><b>Spiciness scale:</b> {spiciness_scale}</p>
				</div>
			</Grid>
		);
	}
	else {
		return (
			<Grid
      	container
      	justify="center"
      	alignItems="center"
    	>
				<div id={id} className="dish"> 
					<p><b>Dish name:</b> {name}</p>
					<p><b>Preparation time:</b> {preparation_time}</p>
					<p><b>Slices of bread:</b> {slices_of_bread}</p>
				</div>
			</Grid>
		);
	}
}

export default Dish;