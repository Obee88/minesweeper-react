'use strict';

import React from 'react';
import MinesweeperField from './minesweeper-field.js';

class MinesweeperBoard extends React.Component {
	/**
		props:
			game  	[MinesweeperGameModel],
			mouse 	[MouseModel]
	*/

	constructor(props){
		super(props);
	}

	render(){
		var divs = [], 
			f = this.props.game.board,
			h = f.height,
			w = f.width,
			b = (<div className="borderlr" />);

		for (var y=0; y<h; y++){
			divs.push(b);
			for (var x=0; x<w; x++){
				divs.push(
					(<MinesweeperField model={this.props.game.board.get(x,y)}  
						mouse={this.props.mouse} />));
			}
			divs.push(b);
		}
		var line = [],items = [];
		for (var i=0; i<w;i++){
			line.push(<div className="bordertb" />);		
		}
		return (
			<div className="minesweeper-board" >
				{divs}
				<div className="borderbl" />{line}<div className="borderbr" />	
			</div>
		);
	}
}

export default MinesweeperBoard;