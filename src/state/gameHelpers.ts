import { PayloadAction } from "typesafe-actions";
import { Cell, getNeighbourIndexes, isBlank, isBombFlag, isNumber, isWin, revealBoardOnClick, revealBoardOnDeath } from "../model/Cell";
import { Coordinate, getIndexFromCoordinates } from "../model/Coordinate";
import { initMineField, isBomb } from "../model/Field";
import { SmileyButton } from "../model/Smiley";
import { getGameConfig, getWidth } from "./selectors";
import { RootState } from "./store";

const handleLeftClickForIndex = (state: RootState, index: number) => {
  const { board, mineField } = state;
  const w = getWidth(state);
  const cell = board[index];
  if (!mineField || !isBlank(cell)) {
    return state;
  }
  const field = mineField[index];
  if (isBomb(field)) {
    return ({
      ...state,
      clockRunning: false,
      gameEnded: true,
      board: revealBoardOnDeath(board, mineField, index),
      smileyButton: SmileyButton.facedead,
    });
  }
  const newBoard = revealBoardOnClick(board, mineField, index, w);
  const win = isWin(newBoard, mineField);
  return ({
    ...state,
    board: newBoard,
    gameEnded: win,
    clockRunning: !win,
    smileyButton: win ? SmileyButton.facewin : SmileyButton.facesmile,
  });
}

export const handleLeftClick = (state: RootState, action: PayloadAction<string, Coordinate>) => {
  const { gameEnded, gameStarted, board } = state;
  const {
    width: w,
    height: h,
    mines,
  } = getGameConfig(state);
  if (gameEnded) {
    return state;
  }
  const { x, y } = action.payload;
  const index = getIndexFromCoordinates(x, y, w);
  if (!gameStarted) {
    const newMineField = initMineField(w, h, x, y, mines);
    const newBoard = revealBoardOnClick(board, newMineField, index, w);
    return ({
      ...state,
      gameStarted: true,
      mineField: newMineField,
      clockRunning: true,
      board: newBoard,
    })
  }
  return handleLeftClickForIndex(state, index);
};

export const handleRightClick = (state: RootState, action: PayloadAction<string, Coordinate>) => {
  const { board, minesCounter, gameEnded } = state;
  if (gameEnded) {
    return state;
  }
  const {
    width: w,
   } = getGameConfig(state);
  const { x, y } = action.payload;
  const index = getIndexFromCoordinates(x, y, w);
  const cell = board[index];
  if (isBlank(cell)) {
    const newBoard = [...board];
    newBoard[index] = Cell.bombflagged;
    return ({
      ...state,
      board: newBoard,
      minesCounter: minesCounter - 1,
    });
  }
  if (isBombFlag(cell)) {
    const newBoard = [...board];
    newBoard[index] = Cell.blank;
    return ({
      ...state,
      board: newBoard,
      minesCounter: minesCounter + 1,
    });
  }
  return state;
};

export const handleBothClick = (state: RootState, action: PayloadAction<string, Coordinate>) => {
  const { board, mineField, gameEnded } = state;
  if (gameEnded) {
    return state;
  }
  const {
    width: w,
   } = getGameConfig(state);
  const { x, y } = action.payload;
  const index = getIndexFromCoordinates(x, y, w);
  const cell = board[index];
  if (!mineField) {
    return state;
  }
  if (isNumber(cell)) {
    const neighbourIndexes = getNeighbourIndexes(index, w, board.length);
    let nextState = {...state};
    for (let i = 0; i < neighbourIndexes.length; ++i) {
      const ni = neighbourIndexes[i];
      nextState = handleLeftClickForIndex(nextState, ni);
    }
    return nextState;
  }
  return state;
};