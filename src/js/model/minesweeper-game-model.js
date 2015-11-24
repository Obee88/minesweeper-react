import MinesweeperBoardModel from './minesweeper-board-model.js';
import MinesweeperHeaderModel from './minesweeper-header-model.js';
import MinesweeperMinesFieldModel from './minesweeper-mines-field-model.js';

var MinesweeperGameModel = function(gameSettings){


	this.init = function(gameSettings){
		this.gameSettings = gameSettings;
		this.header = new MinesweeperHeaderModel(gameSettings.width, gameSettings.height, gameSettings.mines);
		this.board = new MinesweeperBoardModel(gameSettings.width, gameSettings.height);
		this.field = new MinesweeperMinesFieldModel(gameSettings.width, gameSettings.height, gameSettings.mines);
		this.status="init";
		this.children = [this.header, this.board, this.field];
		this.setEventHandlers();
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.setEventHandlers = function(){
		this.children.forEach( function(el){
				el.addEventHandler({
					"onStateChanged": function(eventName, e, sender){
						this.fireEvent(eventName, e, this);
					}.bind(this)
				});
			}.bind(this)
		);
		this.header.addEventHandler({
			"onSmileyButtonClicked": function(){ 
				this.restartGame();
			}.bind(this)
		});
	}.bind(this);

  	this.restartGame = function(settings){
  		if (typeof settings === 'undefined'){
  			settings = this.gameSettings;
  		}
  		this.init(settings);
  	}.bind(this);

  	this.startGame = function(fx, fy){
  		this.field = this.field.init(fx, fy);
		this.status = 'started';
		this.header.timer.start();
		this.fireEvent("onStateChanged");
		return this.field;
  	}.bind(this);

  	this.loseGame = function(board, x, y){
  		for(var i=0; i<board.width; i++){
  			for(var j=0; j<board.height; j++){
  				if (this.field.get(i,j)==='x'){
  					if(this.board.get(i,j).isFlagged()){
  						continue;
  					} else if (x==i && y==j) {
  						board.get(i,j).setBombDeath();
  					} else {
  						board.get(i,j).setBombRevealed();
  					}
  				}
  			}
  		}
  		this.status = 'lost';
  		this.header.smileyButton.setDead();
  		this.header.timer.stop();
  		return board;
  	}.bind(this);

  	this.winGame = function(board){
  		for(var i=0; i<board.fields.size();i++){
  			if (board.getByIndex(i).isBlank() && this.field.getByIndex(i)==='x')
  				board.getByIndex(i).setFlagged();
  		}
  		this.status = "win";
  		this.header.smileyButton.setWin();
  		this.header.timer.stop();
  		return board;
  	}.bind(this);

	this.onMouseUp = function(eventName, e, mouseController){
		var s = "";
		this.board.releasePressedFields();
		if (mouseController.isLeftButtonPressed()) s = s+"L";
		if (mouseController.isRightButtonPressed()) s = s+"R";
		this.handleMouseAction(s, mouseController)
	}.bind(this);

	this.onMouseDown = function(eventName, e, mouseController){
		if(mouseController.isLeftButtonPressed()){
			var sender = mouseController.leftButtonPressedElement;
			var c = this.getCordsOfField(sender);
			if (mouseController.isRightButtonPressed()){
				this.board.pressSquare(c.x, c.y);
			} else{
				if (this.board.get(c.x,c.y).getState() === 'blank'){
					this.board.get(c.x,c.y).setPressed();
				}
			}
		}
	}.bind(this);

	this.onMouseOut = function(eventName, e, mouseController){
		var sender = e.target;
		var c = this.getCordsOfField(sender);
		var field = this.board.get(c.x, c.y);
		if (field.getState()==='pressed'){
			field.setBlank();
		}
	}.bind(this);

	this.onMouseOver = function(eventName, e, mouseController){
		var sender = e.target;
		var c = this.getCordsOfField(sender);
		var field = this.board.get(c.x, c.y);
		if (mouseController.isLeftButtonPressed() && mouseController.isRightButtonPressed()){
			this.board.pressSquare(c.x, c.y);
		} else if (field.getState()==="blank" && mouseController.isLeftButtonPressed()){
			field.setPressed();
		}		
	}.bind(this);

	this.getCordsOfField = function(field){
		var coords = field.attributes["data"].nodeValue.split("_");
		var x = parseInt(coords[0]), y = parseInt(coords[1]);
		return {x:x,y:y};
	}.bind(this);

	this.handleMouseAction = function(action, mouseController){
		if (action === "" || this.status=="lost" || this.status=="win") return;
		if (action === "L") {
			var sender = mouseController.hostElement;
			var c = this.getCordsOfField(sender);
			this.board = this.leftClickDone(this.field, this.board, c.x, c.y, false);
		}
		if (action === "R"){
			var sender = mouseController.hostElement;
			var c = this.getCordsOfField(sender);
			this.board = this.rightClickDone(this.field, this.board, c.x, c.y, false);
		}
		if (action === "RL" || action === "LR"){
			if (mouseController.leftButtonPressedElement === mouseController.rightButtonPressedElement){
				var sender = mouseController.hostElement;
				mouseController.releaseButtons();
				var c = this.getCordsOfField(sender);
				this.board = this.doubleClickDone(this.field, this.board, c.x, c.y, false);
			}
		}
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.leftClickDone = function(field,board,x,y, recursive){
		if (!board.isValidCoordinate(x,y)) {return board;}

		if (this.status === 'init' && !recursive){
			field = this.startGame(x,y);
		}

		if (board.get(x,y).getState().startsWith("open")) {return board;}
		if (board.get(x,y).getState() === "blank"){
			var v = field.get(x,y);
			if ( v === 'x'){
				board = this.loseGame(board,x,y);
			}
			else if (v === 0){
				board.get(x,y).setOpen(v);
				board.openFieldsLeft--;
				board = this.leftClickDone(field, board, x-1, y  , true);
				board = this.leftClickDone(field, board, x+1, y  , true);
				board = this.leftClickDone(field, board, x-1, y-1, true);
				board = this.leftClickDone(field, board, x  , y-1, true);
				board = this.leftClickDone(field, board, x+1, y-1, true);
				board = this.leftClickDone(field, board, x-1, y+1, true);
				board = this.leftClickDone(field, board, x  , y+1, true);
				board = this.leftClickDone(field, board, x+1, y+1, true);
			}
			else {
				board.get(x,y).setOpen(v);
				board.openFieldsLeft--;
			}
		}
		if (this.status!='lost' && board.openFieldsLeft === this.gameSettings.mines){
			board = this.winGame(board);
		}
		return board;
	}.bind(this);

	this.rightClickDone = function(field,board,x,y){
		console.log("R"+x+","+y);
		if (board.get(x,y).isBlank()){
			board.get(x,y).setFlagged();
			this.header.minesCounter.decr();
		} else if (board.get(x,y).isFlagged()){
			board.get(x,y).setBlank();
			this.header.minesCounter.inc();
		}
		this.fireEvent("onStateChanged");
		return board;
	}.bind(this);

	this.doubleClickDone = function(field,board,x,y){
		console.log("D"+x+","+y);
		if(board.get(x,y).isOpen()){
			for(var i=0; i<this.board.width; ++i){
				for(var j=0; j<this.board.height; ++j){
					if(i>=x-1 && i<=x+1 && j>=y-1 && j<=y+1){
						board = this.leftClickDone(field, board, i,j,true);
					}
				}
			}
		}
		return board;
	}.bind(this);

	this.fireEvent = function(eventName, e, sender){
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

	///////////// Constructor ///////////////
	this.eventHandlers = [];
	this.init(gameSettings);

}

export default MinesweeperGameModel;