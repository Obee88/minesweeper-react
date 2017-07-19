import Matrix from './matrix.js';
import MinesweeperCellModel from './minesweeper-cell-model.js';

var MinesweeperBoardModel = function(width, height){

	this.initCells = function(width, height){
		this.cells = new Matrix(width, height);
		for(var i=0; i<width; i++){
			for(var j=0; j<height; j++){
				this.cells.set(i, j,
					new MinesweeperCellModel(i,j)
				);
			}
		}
	}.bind(this);

	this.get = function(x,y){
		return this.cells.get(x,y);
	}.bind(this);

	this.getCells = function(){
		return this.cells;
	}.bind(this);

	this.getByIndex = function(index){
		return this.cells.getByIndex(index);
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

	this.releasePressedCells = function(){
		this.getCells().data.forEach(function(cell){
			if (cell.getState()==='pressed'){
				cell.setBlank();
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

	this.numOfFlaggedCellsAround = function(x, y) {
		var num = 0;
		for (var i=x-1; i<=x+1; i++){
			for(var j=y-1; j<=y+1; j++){
				var cell = this.get(i,j);
				if (cell!=null && cell.isFlagged()){
					num++;
				}
			}
		}
		return num;
	}.bind(this);

	/////////// Constructor ////////////
	this.eventHandlers = [];
	this.width = width;
	this.height = height;
	this.openCellsLeft = width * height;
	this.initCells(width, height);
	this.children = this.cells.data;
	this.setEventHandlers();
}

export default MinesweeperBoardModel;