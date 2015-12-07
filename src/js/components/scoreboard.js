"use strict";

import React from 'react';
import Oc from './../crypt/obeecrypt.js';

class ScoreBoard extends React.Component {
	/**
		props:
			scores
	*/
	constructor(props){
		super(props);
	}

	render(){
		var items = [];
		for(var i=1; i<=10; i++){
			try{
				var el = this.props.scores[i.toString()];
				items.push(
					<div className="row" >
						<div className="col-xs-4">{el.name}</div>
						<div className="col-xs-2">{el.time}</div>
						<div className="col-xs-4">{el.date}</div>
					</div>
				);
			} catch(err){}
		}

		return (
			<div className="well" style={{ 'margin-top':'50px'}}>
				<div className="row scoreboard-header" style={{ 'font-weight':'bold'}}>
					<div className="col-xs-4" style={{ 'border-bottom': 'solid black 1px'}}>name</div>
					<div className="col-xs-2" style={{ 'border-bottom': 'solid black 1px'}}>time</div>
					<div className="col-xs-4" style={{ 'border-bottom': 'solid black 1px'}}>date</div>
				</div>
				{items}
			</div>
		);
	}
}

export default ScoreBoard;