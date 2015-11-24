"use strict";

import React from 'react';
import ThreeDigitCounter from './three-digit-counter.js';
import MinesweeperSmileyButton from './minesweeper-smiley-button.js';

class MinesweeperHeader extends React.Component {
	/**
		props:
			headerModel 	[HeaderModel]
			mouse 			[MouseModel]
	*/
	constructor(props){
		super(props);
	}

	calcMargin(){
		var w = this.props.headerModel.width;
		var margin = parseInt((w*16-90-26) / 2);
		return margin;
	}
	
	render(){
		var w = this.props.headerModel.width;
		var line = [],items = [];
		for (var i=0; i<w;i++){
			line.push(<div className="bordertb" />);		
		}

		items.push(<ThreeDigitCounter model={this.props.headerModel.minesCounter} id="mines"/>);
		items.push(<MinesweeperSmileyButton model={this.props.headerModel.smileyButton} margin={this.calcMargin()} />);
		items.push(<ThreeDigitCounter model={this.props.headerModel.timeCounter} id="seconds"/>);

		return (
			<div className="msw-header">
				<div className="bordertl" />{line}<div className="bordertr" />
				<div className="borderlrlong"/>{items}<div className="borderlrlong"/>
				<div className="borderjointl" />{line}<div className="borderjointr" />

			</div>
		);
	}
}

export default MinesweeperHeader;