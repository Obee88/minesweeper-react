import React from 'react';
import MinesweeperCell from './minesweeper-cell.js';
import { range } from 'lodash';
class MinesweeperBoard extends React.Component {
	/**
		props:
			game  	[MinesweeperGameModel],
			mouse 	[MouseModel]
	*/
	
	render(){
		const { height: h, width: w } = this.props.game.board;
		const b =  (key) => (<div key={key} className="borderlr" />);
		var divs = [];
		for (var y=0; y<h; y++){
			divs.push(b(`${y}-l`));
			for (var x=0; x<w; x++){
				divs.push(
					(<MinesweeperCell model={this.props.game.board.get(x,y)}  
						mouse={this.props.mouse} key={`${y}-${x}`}/>));
			}
			divs.push(b(`${y}-r`));
		}
		const line = range(w).map(i => <div key={i} className="bordertb" />);
		return (
			<div className="minesweeper-board" >
				{divs}
				<div className="borderbl" />{line}<div className="borderbr" />	
			</div>
		);
	}
}

export default MinesweeperBoard;