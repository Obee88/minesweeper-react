
var Matrix = function(w, h){

	this.set = function(x, y, value){
		if (!this.isValidCoordinate(x,y)){
			return false;
		}
		this.data[this.getCoordinateIndex(x, y)] = value;
		return true;
	}.bind(this);

	this.setByIndex = function(index, value){
		if (index>=this.size()) {
			return false;
		}
		this.data[index] = value;
		return true;
	}.bind(this);

	this.getByIndex = function(index){
		if (index>=this.size()) {
			return null;
		}
		return this.data[index];
	}.bind(this);

	this.get = function(x, y){
		if (!this.isValidCoordinate(x,y)){
			return null;
		}
		return this.data[this.getCoordinateIndex(x,y)];
	}.bind(this);

	this.getCoordinateIndex = function(x, y){
		if (!this.isValidCoordinate(x,y)){
			return null;
		}
		return y*this.width+x;
	}.bind(this);

	this.isValidCoordinate = function(x, y){
		if (x<0 || x>=this.width) return false;
		if (y<0 || y>=this.height) return false;
		return true;
	}.bind(this);

	this.size = function(){
		return this.data.length;
	}.bind(this);

	this.print = function(){
		for(var i=0; i<this.width; i++){
			var stringBuilder = "";
			for(var j=0; j<this.height; j++){
				var v = this.get(i,j);
				if (typeof v==='undefined') {
					v = 'u';
				}
				stringBuilder = stringBuilder + v + " ";
			}
			console.log(stringBuilder);
		}
	}.bind(this);

	/////////// Constructor ////////////
	this.width = w;
	this.height = h;
	this.data = new Array(w * h); 
}

export default Matrix