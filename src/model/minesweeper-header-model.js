import Timer from './timer-model.js';
import ThreeDigitCounterModel from './three-digit-counter-model.js';
import SmileyButtonModel from './smiley-button-model.js';

var MinesweeperHeaderModel = function(width, height, minesCnt){

	this.setEventHandlers = function(){
		this.childs.forEach( function(el){
				el.addEventHandler({
					"onStateChanged": this.fireEvent
				});
			}.bind(this)
		);
	}.bind(this);

	this.fireEvent = function(eventName, e){
		for(var i=0; i<this.eventHandlers.length; i++){
			try{
				var callback = this.eventHandlers[i][eventName];
				callback(eventName, e, this);	
			} catch(err) {}
		}
	}.bind(this);

	this.addEventHandler = function(eventHandler){
		this.eventHandlers.push(eventHandler);
	}.bind(this);

	this.setEventHandlers = function(){
		this.children.forEach( function(el){
				el.addEventHandler({
					"onStateChanged": this.fireEvent
				});
			}.bind(this)
		);
		this.smileyButton.addEventHandler({
			"onSmileyButtonClicked": this.fireEvent
		});

		this.timer.addEventHandler({
			"onTimeChanged": function(eventName, e, sender){
				this.timeCounter.setNumber(sender.getTime())
			}.bind(this)
		});
	}.bind(this);

	/////////// Constructor ////////////
	this.eventHandlers = [];
	this.width = width;
	this.height = height;
	this.timer = new Timer();
	this.minesCounter = new ThreeDigitCounterModel(minesCnt);
	this.timeCounter = new ThreeDigitCounterModel();
	this.smileyButton = new SmileyButtonModel();
	this.children = [this.smileyButton, this.minesCounter, this.timeCounter];
	this.setEventHandlers();
	

}
	
export default MinesweeperHeaderModel;