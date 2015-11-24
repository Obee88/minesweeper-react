var ThreeDigitCounterModel = function(number){

	this.getNthDigit = function(index){
		if (index==1 && this.isNegative()){
			return "-";
		} 
		var pow = Math.pow(10, 3-index);
		var ret = parseInt(this.number / (pow)) % 10;
		return Math.abs(ret);
	}.bind(this);

	this.inc = function(incVal){
		if(typeof incVal === 'undefined')
			incVal = 1;
		var newNumber = this.number + incVal;
		if (this.canDisplay(newNumber)){
			this.setNumber(newNumber);
			return true;
		}
		return false;
	}.bind(this);

	this.decr = function(decrVal){
		if(typeof decrVal === 'undefined')
			decrVal = 1;
		return this.inc(-1*decrVal);
	}.bind(this);

	this.canDisplay = function(displVal){
		return displVal>-100 && displVal<1000;
	}.bind(this);

	this.isNegative = function(){
		return this.number<0;
	}.bind(this);

	this.setNumber = function(numVal){
		this.number = numVal;
		this.fireEvent("onStateChanged");
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

	/////////// Constructor ////////////
	this.eventHandlers = [];
	if (typeof number === 'undefined'){
		number = 0;
	}
	this.number = number;
}

export default ThreeDigitCounterModel;