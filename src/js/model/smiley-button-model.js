var SmileyButtonModel = function(){

	this.setState = function(state){
		this.state = state
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.setSmile = function(){
		this.setState("facesmile");
	}

	this.setPressed = function(){
		this.setState("facepressed");
	}.bind(this);

	this.setWin = function(){
		this.setState("facewin");
	}

	this.setDead = function(){
		this.setState("facedead");
	}

	this.setOoh = function(){
		this.setState("faceooh")
	}

	this.getState = function(){
		return this.state;
	}

	this.isPressed = function(){
		return this.getState() === 'facepressed';
	}.bind(this);

	this.fireEvent = function(eventName, e, sender){
		for(var i=0; i<this.eventHandlers.length; i++){
			try{
				var callback = this.eventHandlers[i][eventName];
				callback(eventName, e, this);	
			} catch(err) {}
		}
	}.bind(this);

	this.onMouseDown = function(e){
		this.setPressed();
	}.bind(this);

	this.onMouseUp = function(e){
		if(this.isPressed()){
			this.fireEvent("onSmileyButtonClicked")
			this.setSmile();
		}
	}.bind(this);

	this.onMouseOut = function(e){
		this.setSmile();
	}.bind(this);

	this.addEventHandler = function(eventHandler){
		this.eventHandlers.push(eventHandler);
	}.bind(this);

	/////////// Constructor ////////////
	this.eventHandlers = [];
	var defaultState = "facesmile";
	this.setState(defaultState);
}

export default SmileyButtonModel;