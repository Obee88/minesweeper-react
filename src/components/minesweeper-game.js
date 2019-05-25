import React from 'react';
import MinesweeperHeader from './minesweeper-header.js';
import MinesweeperBoard from './minesweeper-board.js';

const BORDER_WIDTH = 10;
const BORDER_HEIGHT = 10;
const FIELD_WIDTH = 16;
const FIELD_HEIGHT = 16;
const HEADER_HEIGHT = 32;

class MinesweeperGame extends React.Component {
	/**
		props:
			game  	[MinesweeperGameModel],
			mouse 	[MouseModel]
	*/

	calcStyle(){
		const widthFieldsNum = this.props.game.gameSettings.width;
		const heightFieldsNum = this.props.game.gameSettings.height;
		const width = 2 * BORDER_WIDTH + widthFieldsNum * FIELD_WIDTH;
		const height = 3 * BORDER_HEIGHT + FIELD_HEIGHT * heightFieldsNum + HEADER_HEIGHT;
		return { width, height };
	}

	render(){
		const { game, mouse } = this.props;
		return (
			<div id="game" style={this.calcStyle()}  className='msw' >
				<MinesweeperHeader headerModel={game.header} mouse={mouse}/>
				<MinesweeperBoard game={game} mouse={mouse}/>						
			</div>
		);
	}
}

export default MinesweeperGame;