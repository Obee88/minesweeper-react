"use strict";

import React from 'react';

class ThreeDigitCounter extends React.Component {
	/**
		props:
			model: 	[ThreeDigitCounterModel]
	*/

	constructor(props){
		super(props)
	}

	render(){
		return (
			<div style={{'background-image':'none'}}>
				<div className={"time"+this.props.model.getNthDigit(1)} id={this.props.id+"_hundreds"} />
				<div className={"time"+this.props.model.getNthDigit(2)} id={this.props.id+"_tens"} />
				<div className={"time"+this.props.model.getNthDigit(3)} id={this.props.id+"_ones"} />
			</div>
		);
	}
}

export default ThreeDigitCounter;