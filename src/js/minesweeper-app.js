"use strict";

import React from 'react';
import PillSelector from './components/pill-selector.js';
import MinesweeperGame from './components/minesweeper-game.js';
import MinesweeperGameModel from './model/minesweeper-game-model.js';
import MouseModel from './model/mouse-model.js';
import ComponentPreview from './components/component-preview.js';
import ScoreBoard from './components/scoreboard.js';
import Oc from './crypt/obeecrypt.js';
import SubmitScoreForm from './components/submit-score-form.js';

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
			selectedLevel: defaultLevel,
			scores: { "easy":{}, "intermediate":{}, "expert":{}},

		};
		this.refreshScores();
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
		mouse.addEventHandler({
			"mouseDown": function(eventName, e, sender){
				if (!this.state.game.isGameOver()){
					this.state.game.header.smileyButton.setOoh();
				}
			}.bind(this),
			"mouseUp": function(eventName, e, sender){
				if (!this.state.game.isGameOver()){
					this.state.game.header.smileyButton.state="facesmile";
				}
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

	refreshScores(){
		var url = "http://localhost:8080/scores";
		// var url = "http://185.53.129.19:8080/server-rest/scores";
		var self = this;
		var onScoresRecived = function(scores){
			self.setState({scores:scores});
		};
		$.ajax({
			url: url,
			dataType: "jsonp",
			jsonpCallback: "onScoresRecived",
			success: onScoresRecived
		});
	}

	submitScore(n,t){
		var url = "http://localhost:8080/scores/submit";
		// var url = "http://185.53.129.19:8080/server-rest/scores/submit";
		var self = this[0];
		var Oc = this[1];
		var encryptedString = Oc.e(t,n);
		console.log(encryptedString);
		var onResp = function(scores){
			var game = self.state.game;
			game.status = "submited";
			self.setState({scores:scores, game: game});
		};
		$.ajax({
			url: url,
			data: {diff: self.state.selectedLevel , name:n, time:t, token: encryptedString},
			dataType: "jsonp",
			jsonpCallback: "onResp",
			success: onResp
		});
	}

	encryptToken(n,t){
		return Oc.e(t,n);
	}

	

	render() {
		return (
			<div>
				<div className="row" >
					<div className="col-xs-6">
						<PillSelector choices={Object.keys(this.levelsAvailable())} 
								selectedChoice={this.state.selectedLevel}
								innitGameCallback={this.onDifficultySelected.bind(this)} />
						<MinesweeperGame game={this.state.game} mouse={this.state.mouse}/>
					</div>
					<div className="col-xs-6">
						<ScoreBoard scores={this.state.scores[this.state.selectedLevel]}/>
					</div>
				</div>	
				<div className="row">
					<div className="col-xs-6">
						<SubmitScoreForm submitScoreCallback={this.submitScore.bind([this,Oc])} 
								gameStatus = {this.state.game.status} 
								currentTimeGetter={this.state.game.header.timer.getTime}
								worstScore = {this.state.scores[this.state.selectedLevel]["10"]}/>
					</div>
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
