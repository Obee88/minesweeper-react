import React from 'react';

interface props {
	id: string;
	value: number,
};

const getNthDigit = (value: number, n: number) => {
  if (n === 1 && value < 0){
    return "-";
  }
  var pow = Math.pow(10, 3 - n);
  var ret = Math.floor((Math.abs(value) / pow) % 10);
  return Math.abs(ret);
}

const ThreeDigitCounter = ({ id, value } : props) => (
	<div style={{'backgroundImage':'none'}}>
		<div className={`time${getNthDigit(value, 1)}`} id={id+"_hundreds"} />
		<div className={`time${getNthDigit(value, 2)}`} id={id+"_tens"} />
		<div className={`time${getNthDigit(value, 3)}`} id={id+"_ones"} />
	</div>
);

export default ThreeDigitCounter;