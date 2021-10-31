import { Field, isBomb, isNumber as isFieldNumber } from "./Field";

export enum Cell {
  blank = 'blank',
  pressed = 'pressed',
  bombflagged = 'bombflagged',
  bombrevealed = 'bombrevealed',
  bombmisflagged = 'bombmisflagged',
  bombdeath = 'bombdeath',
  open0 = 'open0',
  open1 = 'open1',
  open2 = 'open2',
  open3 = 'open3',
  open4 = 'open4',
  open5 = 'open5',
  open6 = 'open6',
  open7 = 'open7',
  open8 = 'open8',
};

export const isBlank = (cell: Cell) => cell === Cell.blank;
export const isOpen = (cell: Cell) => !isBlank(cell);
export const isNumber = (cell: Cell) => cell.startsWith('open');
export const isBombFlag = (cell: Cell) => cell === Cell.bombflagged;

export const initBoard = (w: number, h: number) => {
  return Array(w * h).fill(Cell.blank);
};

export const revealBoardOnDeath = (oldBoard: Cell[], mineField: Field[], deathIndex: number) => {
  const newBoard = [...oldBoard];
  for (let i = 0; i < oldBoard.length; ++ i) {
    const cell = oldBoard[i];
    const f = mineField[i];
    if (isNumber(cell)) {
      continue;
    }
    if (isBlank(cell)) {
      if (isBomb(f)) {
        newBoard[i] = deathIndex === i ? Cell.bombdeath : Cell.bombrevealed;
      }
      if (f === '0') newBoard[i] = Cell.open0;
      if (f === '1') newBoard[i] = Cell.open1;
      if (f === '2') newBoard[i] = Cell.open2;
      if (f === '3') newBoard[i] = Cell.open3;
      if (f === '4') newBoard[i] = Cell.open4;
      if (f === '5') newBoard[i] = Cell.open5;
      if (f === '6') newBoard[i] = Cell.open6;
      if (f === '7') newBoard[i] = Cell.open7;
      if (f === '8') newBoard[i] = Cell.open8;
    }
    if (isBombFlag(cell)) {
      newBoard[i] = isBomb(f) ? Cell.bombflagged : Cell.bombmisflagged;
    }
  }
  return newBoard;
}

export const getNeighbourIndexes = (i: number, w: number, size: number) => {
  const neighbourIndexes = [];
  const isFirstColumn = i % w === 0;
  const isLastColumn = i % w === w - 1;
  const isFirstRow = i < w;
  const isLastRow = i + w >= size;
  if (!isFirstColumn) neighbourIndexes.push(i - 1);
  if (!isLastColumn) neighbourIndexes.push(i + 1);
  if (!isFirstRow) {
    neighbourIndexes.push(i - w);
    if (!isFirstColumn) neighbourIndexes.push(i - w - 1);
    if (!isLastColumn) neighbourIndexes.push(i - w + 1);
  }
  if (!isLastRow) {
    neighbourIndexes.push(i + w);
    if (!isFirstColumn) neighbourIndexes.push(i + w - 1);
    if (!isLastColumn) neighbourIndexes.push(i + w + 1);
  }
  return neighbourIndexes;
}

export const revealBoardOnClick = (board: Cell[], mineField: Field[], i: number, w: number) => {
  let newBoard = [...board];
  const field = mineField[i];
  if (field === '1') { newBoard[i] = Cell.open1; return newBoard; }
  if (field === '2') { newBoard[i] = Cell.open2; return newBoard; }
  if (field === '3') { newBoard[i] = Cell.open3; return newBoard; }
  if (field === '4') { newBoard[i] = Cell.open4; return newBoard; }
  if (field === '5') { newBoard[i] = Cell.open5; return newBoard; }
  if (field === '6') { newBoard[i] = Cell.open6; return newBoard; }
  if (field === '7') { newBoard[i] = Cell.open7; return newBoard; }
  if (field === '8') { newBoard[i] = Cell.open8; return newBoard; }
  if (field === '0') {
    newBoard[i] = Cell.open0;
    const neighbourIndexes = getNeighbourIndexes(i, w, board.length)
      .filter(ni => isBlank(board[ni]) && isFieldNumber(mineField[ni]));
    for (let i = 0; i < neighbourIndexes.length; ++i) {
      newBoard = revealBoardOnClick(newBoard, mineField, neighbourIndexes[i], w);
    }
  }
  return newBoard;
}

export const isWin = (board: Cell[], mineField: Field[]) => {
  for (let i = 0; i < board.length; ++i) {
    const cell = board[i];
    const field = mineField[i];
    if ((isBlank(cell) && !isBomb(field)) || (isBombFlag(cell) && !isBomb(field))) {
      return false;
    }
  }
  return true;
};
