"use strict";

import React from 'react';
import PillSelector from './components/pill-selector.js';
import MinesweeperGame from './components/minesweeper-game.js';
import MinesweeperGameModel from './model/minesweeper-game-model.js';
import MouseModel from './model/mouse-model.js';
import ComponentPreview from './components/component-preview.js';

class MinesweeperApp extends React.Component {

	constructor(props) {
		super();
		var defaultLevel = "easy";
		var game = new MinesweeperGameModel(this.levelsAvailable()[defaultLevel]);
		var mouse = new MouseModel();
		this.setEventHandlers(mouse, game);
		this.state = {
			game:game,
			mouse: mouse,
			selectedLevel: defaultLevel
		}
  	}

  	setEventHandlers(mouse, game){
  		mouse.addEventHandler({
			"mouseUp": game.onMouseUp,
			"mouseDown": game.onMouseDown,
			"mouseOut": game.onMouseOut,
			"mouseOver": game.onMouseOver,
			"onStateChanged": function(eventName, e, sender){ 
				this.setState({mouse:sender});
			}.bind(this)
		});
		game.addEventHandler({
			"onStateChanged": function(eventName, e, sender){
				this.setState({game: sender});
			}.bind(this)
		});
  	}

  	levelsAvailable(){
  		return {
				"easy": {
					"mines":10,
					"width": 9,
					"height": 9
				},
				"intermediate": {
					"mines": 40,
					"width": 16,
					"height": 16
				},
				"expert" : {
					"mines" :99,
					"width": 30,
					"height": 16
				}
			};
  	}

  	onDifficultySelected(dif){
  		this.setState({selectedLevel: dif});
  		this.state.game.restartGame(
  			this.levelsAvailable()[dif]
  			);
  	}

	calcStyle(settings){
		var fieldWidth = 16, borderWidth = 10;
		return {
			"width": fieldWidth * settings.width + 2 * borderWidth,
			"height": fieldWidth * settings.height
		}
	}

	r(key, value){
		this.setState({key:value});
	}

	render() {
		return (
			<div className="row" >
				<div className="col-xs-6">
					<PillSelector choices={Object.keys(this.levelsAvailable())} 
							selectedChoice={this.state.selectedLevel}
							innitGameCallback={this.onDifficultySelected.bind(this)} />
					<MinesweeperGame game={this.state.game} mouse={this.state.mouse}/>
				</div>
			</div>	
			);
	} 

}

function render(dummy) {
	React.render(
		<MinesweeperApp />,
		document.getElementById('content')
	);
}

document.addEventListener('DOMContentLoaded', function () {
	render();
});
