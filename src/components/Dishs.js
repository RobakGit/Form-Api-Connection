import React from 'react';
import Dish from './Dish';

const Dishs = ({dishs}) => {

const dishArray = dishs.map((dish, i) => {
		// if (true) {
		// 	throw new Error('Błąd!');
		// }
		return (
			<Dish 
			key={i} 
			id={dishs[i].id}
			type={dishs[i].type} 
			name={dishs[i].name} 
			preparation_time={dishs[i].preparation_time}
			no_of_slices={dishs[i].no_of_slices}
			diameter={dishs[i].diameter}
			spiciness_scale={dishs[i].spiciness_scale}
			slices_of_bread={dishs[i].slices_of_bread}
			/>
		);
	})

	return (
				<div className="dishes"> 
					{dishArray}
				</div>
		);
}

export default Dishs;