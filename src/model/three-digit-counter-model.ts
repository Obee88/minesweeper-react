

class ThreeDigitCounterModel {
	number: number;

	isNegative() {
		return this.number < 0;
	}

	getNthDigit(n: number) {
		if (n === 1 && this.isNegative()){
			return "-";
		} 
		var pow = Math.pow(10, 3 - n);
		var ret = (this.number / pow) % 10;
		return Math.abs(ret);
	}

	canDisplay(displVal: number){
		return displVal > -100 && displVal < 1000;
	};

	setNumber(numVal: number){
		this.number = numVal;
	}

	inc(incVal: number | undefined) {
		if(typeof incVal === 'undefined')
			incVal = 1;
		var newNumber = this.number + incVal;
		if (this.canDisplay(newNumber)){
			this.setNumber(newNumber);
			return true;
		}
		return false;
	}

	decr(decrVal: number | undefined) {
		if(typeof decrVal === 'undefined')
			decrVal = 1;
		return this.inc(-1 * decrVal);
	}

  constructor(number: number) {
    this.number = number; 
  }
};

export default ThreeDigitCounterModel;
