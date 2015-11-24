"use strict";

import React from 'react';
import MinesweeperHeader from './minesweeper-header.js';
import MinesweeperBoard from './minesweeper-board.js';

class MinesweeperGame extends React.Component {
	/**
		props:
			game  	[MinesweeperGameModel],
			mouse 	[MouseModel]
	*/

	calcStyle(){
		var widthFieldsNum = this.props.game.gameSettings.width;
		var heightFieldsNum = this.props.game.gameSettings.height;
		var BORDER_WIDTH = 10, BORDER_HEIGHT = 10, FIELD_WIDTH = 16, FIELD_HEIGHT = 16, HEADER_HEIGHT = 32;
		var w = 2 * BORDER_WIDTH + widthFieldsNum * FIELD_WIDTH;
		var h = 3 * BORDER_HEIGHT + FIELD_HEIGHT * heightFieldsNum + HEADER_HEIGHT;
		
		return {
			width: w,
			height: h
		}
	}

	render(){
		return (
			<div id="game" style={this.calcStyle()}  className='msw' >
				<MinesweeperHeader headerModel={this.props.game.header} mouse={this.props.mouse}/>
				<MinesweeperBoard game={this.props.game} mouse={this.props.mouse}/>						
			</div>
		);
	}
}

export default MinesweeperGame;