import { createReducer, PayloadAction } from 'typesafe-actions';
import { Coordinate, DifficultyOption, DIFFICULTY_OPTIONS, MouseEvent, MouseKey, SmileyButton } from '../constants';
import { getIndexFromCoordinates } from '../helpers';
import { Cell, initBoard, isBlank, isBombFlag, isWin, revealBoardOnClick, revealBoardOnDeath } from '../model/Cell';
import { Field, initMineField, isBomb } from '../model/Field';
import {
  SET_DIFFICULTY,
  SET_MINES_COUNTER,
  SET_TIME_COUNTER,
  SET_SMILEY_BUTTON,
  ON_MOUSE_DOWN,
  ON_MOUSE_UP,
  ON_MOUSE_ENTER,
  CLOCK_TICK,
  CELL_LEFT_CLICK,
  CELL_RIGHT_CLICK,
  SMILEY_CLICK,
} from './actions';
import { getGameConfig } from './selectors';

export type RootState = {
  difficulty: DifficultyOption,
  minesCounter: number,
  timeCounter: number,
  smileyButton: SmileyButton,
  board: Cell[],
  mineField: Field[] | undefined,
  mouseLeft: string | undefined,
  mouseMiddle: string | undefined,
  mouseRight: string | undefined,
  clockRunning: boolean,
  gameStarted: boolean,
};

const getInitialState = (difficulty = DIFFICULTY_OPTIONS[0]) => ({
  difficulty,
  minesCounter: difficulty.config.mines,
  timeCounter: 0,
  smileyButton: SmileyButton.facesmile,
  board: initBoard(difficulty.config.width, difficulty.config.height),
  mineField: undefined,
  mouseLeft: undefined,
  mouseMiddle: undefined,
  mouseRight: undefined,
  clockRunning: false,
  gameStarted: false,
});

const reducer = createReducer<RootState>(getInitialState())
  .handleType(SET_DIFFICULTY, (state: RootState, action: PayloadAction<string, DifficultyOption>) => (
    getInitialState(action.payload)
  ))
  .handleType(SET_MINES_COUNTER, (state: RootState, action: PayloadAction<string, number>) => ({
    ...state,
    minesCounter: action.payload, 
  }))
  .handleType(SET_TIME_COUNTER, (state: RootState, action: PayloadAction<string, number>) => ({
    ...state,
    timeCounter: action.payload, 
  }))
  .handleType(SET_SMILEY_BUTTON, (state: RootState, action: PayloadAction<string, SmileyButton>) => ({
    ...state,
    smileyButton: action.payload, 
  }))
  .handleType(ON_MOUSE_DOWN, (state: RootState, action: PayloadAction<string, MouseEvent>) => {
    if (action.payload.key === MouseKey.LEFT) {
      return ({
        ...state,
        mouseLeft: action.payload.target,
        smileyButton: SmileyButton.faceooh,
      });
    }
    if (action.payload.key === MouseKey.MIDDLE) {
      return ({
        ...state,
        mouseMiddle: action.payload.target,
        smileyButton: SmileyButton.faceooh,
      });
    }
    if (action.payload.key === MouseKey.RIGHT) {
      return ({
        ...state,
        mouseRight: action.payload.target,
        smileyButton: SmileyButton.faceooh,
      });
    }
    return state;
  })
  .handleType(ON_MOUSE_UP, (state: RootState, action: PayloadAction<string, MouseEvent>) => {
    if (action.payload.key === MouseKey.LEFT) {
      return ({
        ...state,
        mouseLeft: undefined,
        smileyButton: state.mouseRight ? SmileyButton.faceooh : SmileyButton.facesmile,
      });
    }
    if (action.payload.key === MouseKey.MIDDLE) {
      return ({
        ...state,
        mouseMiddle: undefined,
        smileyButton: (state.mouseRight || state.mouseLeft) ? SmileyButton.faceooh : SmileyButton.facesmile,
      });
    }
    if (action.payload.key === MouseKey.RIGHT) {
      return ({
        ...state,
        mouseRight: undefined,
        smileyButton: state.mouseLeft ? SmileyButton.faceooh : SmileyButton.facesmile,
      });
    }
    return state;
  })
  .handleType(ON_MOUSE_ENTER, (state: RootState, action: PayloadAction<string, MouseEvent>) => {
    if (state.mouseLeft !== undefined && state.mouseRight !== undefined) {
      return ({
        ...state,
        mouseLeft: action.payload.target,
        mouseRight: action.payload.target,
      });
    }
    if (state.mouseLeft !== undefined) {
      return ({
        ...state,
        mouseLeft: action.payload.target,
      });
    }
    if (state.mouseMiddle !== undefined) {
      return ({
        ...state,
        mouseMiddle: action.payload.target,
      });
    }
    if (state.mouseRight !== undefined) {
      return ({
        ...state,
        mouseRight: action.payload.target,
      });
    }
    return state;
  })
  .handleType(CELL_LEFT_CLICK, (state: RootState, action: PayloadAction<string, Coordinate>) => {
    const { board, mineField, gameStarted } = state;
    const {
      width: w,
      height: h,
      mines,
     } = getGameConfig(state);
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
    const cell = board[index];
    if (!mineField || !isBlank(cell)) {
      return state;
    }
    const field = mineField[index];
    if (isBomb(field)) {
      return ({
        ...state,
        clockRunning: false,
        board: revealBoardOnDeath(board, mineField, index),
        smileyButton: SmileyButton.facedead,
      });
    }
    const newBoard = revealBoardOnClick(board, mineField, index, w);
    const win = isWin(newBoard, mineField);
    return ({
      ...state,
      clockRunning: !win,
      board: newBoard,
      smileyButton: win ? SmileyButton.facewin : SmileyButton.facesmile,
    });
  })
  .handleType(CELL_RIGHT_CLICK, (state: RootState, action: PayloadAction<string, Coordinate>) => {
    const { board, minesCounter } = state;
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
  })
  .handleType(SMILEY_CLICK, (state: RootState) => (
    getInitialState(state.difficulty)
  ))
  .handleType(CLOCK_TICK, (state: RootState) => ({
    ...state,
    timeCounter: state.timeCounter + 1,
  }));
  
export default reducer;