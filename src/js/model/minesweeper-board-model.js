import Matrix from './Matrix.js';
import MinesweeperFieldModel from './minesweeper-field-model.js';

var MinesweeperBoardModel = function(width, height){

	this.initFields = function(width, height){
		this.fields = new Matrix(width, height);
		for(var i=0; i<width; i++){
			for(var j=0; j<height; j++){
				this.fields.set(i, j,
					new MinesweeperFieldModel(i,j)
				);
			}
		}
	}.bind(this);

	this.get = function(x,y){
		return this.fields.get(x,y);
	}.bind(this);

	this.getByIndex = function(index){
		return this.fields.getByIndex(index);
	}.bind(this);

	this.pressSquare = function(x, y){
		for(var i=0; i<this.width; ++i){
			for(var j=0; j<this.height; ++j){
				var el = this.get(i,j);
				if(i>=x-1 && i<=x+1 && j>=y-1 && j<=y+1){
					if (el.isBlank()){
						el.setPressed();
					}
				} else {
					if (el.isPressed()){
						el.setBlank();
					}
				}
			}
		}
	}.bind(this);

	this.releasePressedFields = function(){
		this.fields.data.forEach(function(field){
			if (field.getState()==='pressed'){
				field.setBlank();
			}
		});
	}.bind(this);

	this.isValidCoordinate = function(x, y){
		if (x<0 || x>=this.width) return false;
		if (y<0 || y>=this.height) return false;
		return true;
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
					"onStateChanged": function(eventName, e, sender){
						this.fireEvent(eventName,e,this);
					}.bind(this)
				});
			}.bind(this)
		);
	}.bind(this);

	this.numOfFlaggedFieldsAround = function(x, y) {
		var num = 0;
		if (this.get(x  , y-1).isFlagged()) num++;
		if (this.get(x  , y+1).isFlagged()) num++;
		if (this.get(x-1, y-1).isFlagged()) num++;
		if (this.get(x-1, y  ).isFlagged()) num++;
		if (this.get(x-1, y+1).isFlagged()) num++;
		if (this.get(x+1, y+1).isFlagged()) num++;
		if (this.get(x+1, y  ).isFlagged()) num++;
		if (this.get(x+1, y-1).isFlagged()) num++;
		return num;
	}.bind(this);

	/////////// Constructor ////////////
	this.eventHandlers = [];
	this.width = width;
	this.height = height;
	this.openFieldsLeft = width * height;
	this.initFields(width, height);
	this.children = this.fields.data;
	this.setEventHandlers();
}

export default MinesweeperBoardModel;