var Timer = function(initTime, thickPeriod){

	this.doThick = function(){
		this.timeout = setTimeout(
			function() {
				this.incThicks();
				if (this.isRunning()){
					this.doThick.bind(this)();
				}
			}.bind(this),
			this.thickPeriod
		);
	}.bind(this);

	this.incThicks = function(incVal){
		if(typeof incVal === 'undefined')
			incVal = 1;
		var newThicksVal = this.thicks>=999? 999 : this.thicks+1;
		this.setTime(newThicksVal);
	}.bind(this);

	this.setTime = function(timeVal){
		if (typeof timeVal === 'undefined'){
			timeVal = 0;
		}
		this.thicks = timeVal;
		this.fireEvent("onTimeChanged");
		this.fireEvent("onStateChanged");
	}.bind(this);

	this.getTime = function(){
		return this.thicks;
	}.bind(this);

	this.fireEvent = function(eventName, e){
		for(var i=0; i<this.eventHandlers.length; i++){
			try{
				var callback = this.eventHandlers[i][eventName];
				callback(e, this);	
			} catch(err) {}
		}
	}.bind(this);
	
	this.addEventHandler = function(eventHandler){
		this.eventHandlers.push(eventHandler);
	}.bind(this);

	this.isRunning = function(){
		return this.status === 'running';
	}.bind(this);

	this.start = function(){
		this.status = 'running';
		this.doThick();
	}.bind(this);

	this.stop = function(){
		clearTimeout(this.timeout);
		this.status = 'stopped';
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
	this.thickPeriod = typeof thickPeriod === 'undefined' ? 1000 : thickPeriod;
	this.thicks = typeof initTime === 'undefined' ? 0 : initTime;
	this.status = 'stopped';
}

export default Timer;