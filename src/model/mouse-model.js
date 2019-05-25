var MouseModel = function(){

	this.setLeftButtonPressed = function(sender){
		this.leftButtonPressedElement = sender;
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.setRightButtonPressed = function(sender){
		this.rightButtonPressedElement = sender;
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.setHostElement = function(element){
		this.hostElement = element;
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.releaseButtons = function(){
		this.setLeftButtonPressed(null);
		this.setRightButtonPressed(null);
	}.bind(this);

	this.isLeftButtonPressed = function(){
		return this.leftButtonPressedElement!=null;
	}.bind(this);

	this.isRightButtonPressed = function(){
		return this.rightButtonPressedElement!=null;
	}.bind(this);

	this.catchMouseDown = function(e){
		if (e.nativeEvent.which === 1){
			this.setLeftButtonPressed(e.target);
		}
		if (e.nativeEvent.which === 3){
			this.setRightButtonPressed(e.target);
		}
		this.fireEvent("mouseDown",e);
	}.bind(this);

	this.catchMouseUp = function(e){
		this.fireEvent("mouseUp", e);
		if (e.nativeEvent.which === 1){
			this.setLeftButtonPressed(null);
		}
		if (e.nativeEvent.which === 2){
			this.setMiddleButtonPressed(null);
		}
		if (e.nativeEvent.which === 3){
			this.setRightButtonPressed(null);
		}
		this.fireEvent("postMouseUp", e);
	}.bind(this);

	this.catchMouseOut = function(e){
		this.fireEvent("mouseOut", e);
	}.bind(this);

	this.catchMouseOver = function(e){
		this.setHostElement(e.target);
		this.fireEvent("mouseOver", e);
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

	///////////// Constructor ///////////////
	this.hostElement = null;
	this.leftButtonPressedElement = null;
	this.rightButtonPressedElement = null;
	this.eventHandlers = [];
}

export default MouseModel;