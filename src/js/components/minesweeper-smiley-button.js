"use strict";

import React from 'react';

class MinesweeperSmileyButton extends React.Component {
	/**
		props:
			model: 	[SmileyButtonModel]
			margin: [int] 
	*/

	constructor(props){
		super(props)
	}

	getStyles(){
		var margin = this.props.margin;
		return {
			"margin-left": margin+"px",
			"margin-right": margin+"px",
			"margin-top": "3px",
			"margin-bottom": "3px"
		}

	}

	render(){
		return (<div style={{'background-image':'none'}}>
					<div id="smiley" className={this.props.model.getState()} style={this.getStyles()}
							onMouseDown={this.props.model.onMouseDown}
							onMouseUp={this.props.model.onMouseUp} onMouseOut={this.props.model.onMouseOut} />
				</div>
		);
	}
}

export default MinesweeperSmileyButton;