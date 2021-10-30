import { Cell, Field, MouseKey } from "./constants"

export const initBoard = (w: number, h: number) => {
  return Array(w * h).fill(Cell.blank);
}

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
  
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const i = getIndexFromCoordinates(x, y, width);
      if (mineField[i] !== 'x') {
        var c = 0;
        if (mineField[getIndexFromCoordinates(x-1, y-1, width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x-1, y  , width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x-1, y+1, width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x  , y-1, width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x  , y+1, width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x+1, y-1, width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x+1, y  , width)] === 'x') c++;
        if (mineField[getIndexFromCoordinates(x+1, y+1, width)] === 'x') c++;
        mineField[i] = c;
      }
    }
  }

  return mineField;
};

export const getMouseKey = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (e.nativeEvent.button === 0) {
    return MouseKey.LEFT;
  }
  if (e.nativeEvent.button === 2) {
    return MouseKey.RIGHT;
  }
  return MouseKey.MIDDLE
};

export const getCoordinatesFromKey = (key: string) => {
  const parts = key.split('_');
  return {
    x: parseInt(parts[0], 10),
    y: parseInt(parts[1], 10),
  };
}

export const getIndexFromCoordinates = (x: number, y: number, w: number) => y * w + x;