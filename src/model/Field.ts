import { getNeighbourIndexes } from "./Cell";
import { getIndexFromCoordinates } from "./Coordinate";

export type Field = 'X' | 'x' | '0' | '1'  | '2'  | '3'  | '4'  | '5'  | '6'  | '7'  | '8';

export const isNumber = (f: Field) => f !== 'x' && f !== 'X';
export const isBomb = (f: Field) => f === 'x';


const shuffleArray = (array : Field[]) => {
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

export const initMineField = (width: number, height: number, x: number, y: number, cnt: number) => {
  const mineFieldSize = width * height;
  let mineField = Array(mineFieldSize);

  mineField[getIndexFromCoordinates(x, y, width)] = 'X';
  var minesArr = new Array(mineFieldSize - 1);
  for (let i = 0; i < cnt; i++){
    minesArr[i] = 'x';
  }
  minesArr = shuffleArray(minesArr);

  for (let i = 0, m = 0; i < mineFieldSize; i++) {
    if (mineField[i] !== 'X') {
      mineField[i] = minesArr[m++];
    }
  }

  for (let i = 0; i < mineFieldSize; ++i) {
    if (mineField[i] !== 'x') {
      const neighbourIndexes = getNeighbourIndexes(i, width, mineFieldSize);
      const neighbourMines = neighbourIndexes.map(ni => mineField[ni] === 'x' ? 1 : 0);
      const neighbourMinesCount = neighbourMines.reduce((acc: number, cur) => (acc + cur), 0);
      mineField[i] = `${neighbourMinesCount}`;
    }
  }

  return mineField;
};
