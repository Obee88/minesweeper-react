import Matrix from './matrix.js';

var MinesweeperMinesFieldModel = function(width, height, minesCnt) {

	this.init = function(x, y){
		this.randomizeMines.bind(this)(this.minesCnt, x, y);
		this.calculateNumbers.bind(this)();
		this.fireEvent("onStateChanged");
		return this;
	}.bind(this);

	this.randomizeMines = function(cnt, x, y) {
		
		var shuffleArray = function(array) {
	  	var currentIndex = array.length, temporaryValue, randomIndex ;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			return array;
		};

		this.field.set(x, y, 'X');
		var minesArr = new Array(this.field.size()-1);
		for (let i = 0; i < cnt; i++){
			minesArr[i] = 'x';
		}
		
		minesArr = shuffleArray(minesArr);
		for (let i = 0, m = 0; i < this.field.size(); i++) {
			if (this.field.getByIndex(i) !== 'X') {
				this.field.setByIndex(i, minesArr[m++]);
			}
		}
	}.bind(this);

	this.calculateNumbers = function(field) {
		for(let x = 0; x < this.field.width; x++){
			for(let y = 0; y < this.field.height; y++) if (this.field.get(x,y) !== 'x'){
				var cnt = 0;
				if (this.field.get(x-1,y-1)==='x') cnt++;
				if (this.field.get(x-1,y  )==='x') cnt++;
				if (this.field.get(x-1,y+1)==='x') cnt++;
				if (this.field.get(x  ,y-1)==='x') cnt++;
				if (this.field.get(x  ,y+1)==='x') cnt++;
				if (this.field.get(x+1,y-1)==='x') cnt++;
				if (this.field.get(x+1,y  )==='x') cnt++;
				if (this.field.get(x+1,y+1)==='x') cnt++;
				this.field.set(x,y,cnt);
			}
		}
	}.bind(this);

	this.get = function(x, y){
		return this.field.get(x,y);
	}.bind(this);

	this.getByIndex = function(index){
		return this.field.getByIndex(index);
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
	this.width = width;
	this.height = height;
	this.minesCnt = minesCnt;
	this.field = new Matrix(width, height);
}

export default MinesweeperMinesFieldModel;