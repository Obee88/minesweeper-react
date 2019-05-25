import React from 'react';

class ThreeDigitCounter extends React.Component {
	/**
		props:
			model: 	[ThreeDigitCounterModel]
	*/
	render(){
		const {
			id,
			model: { getNthDigit },
		} = this.props;
		return (
			<div style={{'backgroundImage':'none'}}>
				<div className={`time${getNthDigit(1)}`} id={id+"_hundreds"} />
				<div className={`time${getNthDigit(2)}`} id={id+"_tens"} />
				<div className={`time${getNthDigit(3)}`} id={id+"_ones"} />
			</div>
		);
	}
}

export default ThreeDigitCounter;