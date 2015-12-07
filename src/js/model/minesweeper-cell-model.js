var MinesweeperCellModel = function(x, y, state){

	this.setState = function(newState){
		this.state = newState;
		this.fireEvent("onStateChanged", {});
	}.bind(this);

	this.getState = function(){
		return this.state;
	}.bind(this);

	this.setBlank = function(){
		this.setState("blank");
	}.bind(this);

	this.setOpen = function(number){
		if (typeof number === 'undefined'){
			number = 0;
		}
		this.setState("open"+number);
	}.bind(this);

	this.setPressed = function(){
		this.setState("pressed");
	}.bind(this);

	this.setFlagged = function(){
		this.setState("bombflagged");
	}.bind(this);

	this.setBombRevealed = function(){
		this.setState("bombrevealed");
	}.bind(this);

	this.setBombMisflaged = function(){
		this.setState("bombmisflagged");
	}.bind(this);

	this.setBombDeath = function(){
		this.setState("bombdeath");
	}.bind(this);

	this.getKey = function(){
		return this.x+"_"+this.y;
	}.bind(this);

	this.isBlank = function(){
		return this.state === 'blank';
	}.bind(this);

	this.isFlagged = function(){
		return this.state === 'bombflagged';
	}.bind(this);

	this.isPressed = function(){
		return this.state === 'pressed';
	}.bind(this);

	this.isOpen = function(){
		return this.state.startsWith('open');
	}.bind(this);

	this.fireEvent = function(eventName, e, sender){
		for(var i=0; i<this.eventHandlers.length; i++){
			try{
				var callback = this.eventHandlers[i][eventName];
				callback(eventName, e, this);	
			} catch(err) {}
		}
	}.bind(this);

	this.getNumber = function(x, y){
		if (!this.isOpen){
			return -1;
		}
		var state = this.getState();
		return parseInt(state.substr(state.length - 1));
	}.bind(this);

	this.addEventHandler = function(eventHandler){
		this.eventHandlers.push(eventHandler);
	}.bind(this);

	///////////// Constructor ///////////////
	this.eventHandlers = [];
	this.x = x;
	this.y = y;
	var defaultState = "blank";
	this.state = typeof state === 'undefined' ? defaultState : state;
}

export default MinesweeperCellModel;