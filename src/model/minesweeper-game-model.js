import MinesweeperBoardModel from './minesweeper-board-model.js';
import MinesweeperHeaderModel from './minesweeper-header-model.js';
import MinesweeperMinesFieldModel from './minesweeper-mines-field-model.js';

const MinesweeperGameModel = function(gameSettings){

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
  		for(let i = 0; i<board.width; i++){
  			for(let j = 0; j<board.height; j++){
  				if (this.field.get(i,j)==='x'){
  					if(board.get(i,j).isFlagged()){
  						continue;
  					} else if (x === i && y === j) {
  						board.get(i,j).setBombDeath();
  					} else {
  						board.get(i,j).setBombRevealed();
  					}
  				} else if (board.get(i,j).isFlagged()){
  					board.get(i,j).setBombMisflaged();
  				}
  			}
  		}
  		this.status = 'lost';
  		this.header.smileyButton.setDead();
  		this.header.timer.stop();
  		return board;
  	}.bind(this);

  	this.winGame = function(board){
  		for(let i = 0; i<board.getCells().size(); i++){
  			if (board.getByIndex(i).isBlank() && this.field.getByIndex(i)==='x')
  				board.getByIndex(i).setFlagged();
  		}
  		this.status = "win";
  		this.header.smileyButton.setWin();
  		this.header.timer.stop();
  		return board;
  	}.bind(this);

	this.onMouseUp = function(eventName, e, mouseController){
		let s = "";
		this.board.releasePressedCells();
		if (mouseController.isLeftButtonPressed()) s = s + "L";
		if (mouseController.isRightButtonPressed()) s = s + "R";
		this.handleMouseAction(s, mouseController)
	}.bind(this);

	this.onMouseDown = function(eventName, e, mouseController){
		if(mouseController.isLeftButtonPressed()){
			const sender = mouseController.leftButtonPressedElement;
			const c = this.getCordsOfCell(sender);
			if(!this.isGameOver()){
				if (mouseController.isRightButtonPressed()){
					this.board.pressSquare(c.x, c.y);
				} else{
					if (this.board.get(c.x,c.y).getState() === 'blank'){
						this.board.get(c.x,c.y).setPressed();
					}
				}
			}
		}
	}.bind(this);

	this.onMouseOut = function(eventName, e, mouseController){
		const sender = e.target;
		const c = this.getCordsOfField(sender);
		const field = this.board.get(c.x, c.y);
		if (field.getState()==='pressed'){
			field.setBlank();
		}
	}.bind(this);

	this.onMouseOver = function(eventName, e, mouseController){
		const sender = e.target;
		const c = this.getCordsOfField(sender);
		const field = this.board.get(c.x, c.y);
		if (mouseController.isLeftButtonPressed() && mouseController.isRightButtonPressed()){
			this.board.pressSquare(c.x, c.y);
		} else if (field.getState()==="blank" && mouseController.isLeftButtonPressed()){
			field.setPressed();
		}		
	}.bind(this);

	this.getCordsOfCell = function(field){
		const coords = field.attributes["data"].nodeValue.split("_");
		const x = parseInt(coords[0]), y = parseInt(coords[1]);
		return {x:x,y:y};
	}

	this.handleMouseAction = function(action, mouseController){
		if (action === "" || this.status === "lost" || this.status === "win") return;
		if (action === "L") {
			const sender = mouseController.hostElement;
			const c = this.getCordsOfCell(sender);
			this.board = this.leftClickDone(this.field, this.board, c.x, c.y, false);
		}
		if (action === "R"){
			const sender = mouseController.hostElement;
			const c = this.getCordsOfCell(sender);
			this.board = this.rightClickDone(this.field, this.board, c.x, c.y, false);
		}
		if (action === "RL" || action === "LR"){
			if (mouseController.leftButtonPressedElement === mouseController.rightButtonPressedElement){
				const sender = mouseController.hostElement;
				mouseController.releaseButtons();
				const c = this.getCordsOfCell(sender);
				this.board = this.doubleClickDone(this.field, this.board, c.x, c.y, false);
			}
		}
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.leftClickDone = function(field, board, x, y, recursive){
		if (!board.isValidCoordinate(x,y)) {return board;}

		if (this.status === 'init' && !recursive){
			field = this.startGame(x,y);
		}

		if (board.get(x,y).getState().startsWith("open")) {return board;}
		if (board.get(x,y).getState() === "blank"){
			const v = field.get(x,y);
			if ( v === 'x'){
				board = this.loseGame(board,x,y);
			}
			else if (v === 0){
				board.get(x,y).setOpen(v);
				board.openCellsLeft--;
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
				board.openCellsLeft--;
			}
		}
		if (this.status !== 'lost' && board.openCellsLeft === this.gameSettings.mines){
			board = this.winGame(board);
		}
		return board;
	}.bind(this);

	this.rightClickDone = function(field ,board, x, y){
		// console.log("R"+x+","+y);
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

	this.doubleClickDone = function(field, board, x, y){
		// console.log("D"+x+","+y);
		if (board.get(x,y).isOpen()){
			if (board.get(x,y).getNumber() === board.numOfFlaggedCellsAround(x,y)){
				for(let i = x-1; i <= x + 1; ++i){
					for(let j = y-1; j <= y + 1; ++j){
						board = this.leftClickDone(field, board, i, j,true);
					}
				}
			}

		}
		return board;
	}.bind(this);

	this.isGameOver = function(){
		return ["win","lost"].indexOf(this.status) !== -1;
	}.bind(this);

	this.fireEvent = function(eventName, e, sender){
		for(let i = 0; i<this.eventHandlers.length; i++){
			try{
				const callback = this.eventHandlers[i][eventName];
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