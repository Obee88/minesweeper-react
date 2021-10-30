import React from 'react';
import ThreeDigitCounter from './three-digit-counter.js';
import MinesweeperSmileyButton from './minesweeper-smiley-button.js';
import { range } from 'lodash';

class MinesweeperHeader extends React.Component {
	/**
		props:
			headerModel 	[HeaderModel]
			mouse 			[MouseModel]
	*/

	calcMargin(){
	}
	
	render(){
		const {
			headerModel: {
				width,
				minesCounter,
				smileyButton,
				timeCounter,
			},
		} = this.props;
		const line = range(width).map(key => <div key={key} className="bordertb" />);

		return (
			<div className="msw-header">
				<div className="bordertl" />{line}<div className="bordertr" />
				<div className="borderlrlong"/>
				<ThreeDigitCounter model={minesCounter} id="mines" />
				<MinesweeperSmileyButton model={smileyButton} margin={this.calcMargin()} />
				<ThreeDigitCounter model={timeCounter} id="seconds"/>
				<div className="borderlrlong"/>
				<div className="borderjointl" />{line}<div className="borderjointr" />

			</div>
		);
	}
}

export default MinesweeperHeader;