var SmileyButtonModel = function(){

	this.setState = function(state){
		this.state = state
		this.fireEvent("onStateChanged");
		return this;
	}.bind(this);

	this.setSmile = function(){
		this.setState("facesmile");
		return this;
	}

	this.setPressed = function(){
		this.setState("facepressed");
		return this;
	}.bind(this);

	this.setWin = function(){
		this.setState("facewin");
		return this;
	}

	this.setDead = function(){
		this.setState("facedead");
		return this;
	}

	this.setOoh = function(){
		this.setState("faceooh")
		return this;
	}

	this.getState = function(){
		return this.state;
	}

	this.isPressed = function(){
		return this.getState() === 'facepressed';
	}.bind(this);

	this.fireEvent = function(eventName, e, sender){
		for(var i = 0; i < this.eventHandlers.length; i++){
			try {
				var callback = this.eventHandlers[i][eventName];
				callback(eventName, e, this);	
			} catch(err) {}
		}
	}.bind(this);

	this.onMouseDown = function(e){
		this.setPressed();
		return this;
	}.bind(this);

	this.onMouseUp = function(e){
		if(this.isPressed()){
			this.fireEvent("onSmileyButtonClicked")
			this.setSmile();
		}
		return this;
	}.bind(this);

	this.onMouseOut = function(e){
		if (!(this.state === "facewin" || this.state === "facedead")){
			this.setSmile();
		}
		return this;
	}.bind(this);

	this.addEventHandler = function(eventHandler){
		this.eventHandlers.push(eventHandler);
		return this;
	}.bind(this);

	/////////// Constructor ////////////
	this.eventHandlers = [];
	var defaultState = "facesmile";
	this.setState(defaultState);
}

export default SmileyButtonModel;