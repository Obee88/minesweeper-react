import { createReducer, PayloadAction } from 'typesafe-actions';
import { Cell, DifficultyOption, DIFFICULTY_OPTIONS, Field, MouseEvent, MouseKey, SmileyButton } from '../constants';
import { initBoard, initMineField } from '../helpers';
import {
  SET_DIFFICULTY,
  SET_MINES_COUNTER,
  SET_TIME_COUNTER,
  SET_SMILEY_BUTTON,
  ON_MOUSE_DOWN,
  ON_MOUSE_UP,
  ON_MOUSE_ENTER,
} from './actions';

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
});

const reducer = createReducer<RootState>(getInitialState())
  .handleType(SET_DIFFICULTY, (state: RootState, action: PayloadAction<string, DifficultyOption>) => ({
    ...state,
    difficulty: action.payload, 
  }))
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
      });
    }
    if (action.payload.key === MouseKey.MIDDLE) {
      return ({
        ...state,
        mouseMiddle: action.payload.target,
      });
    }
    if (action.payload.key === MouseKey.RIGHT) {
      return ({
        ...state,
        mouseRight: action.payload.target,
      });
    }
    return state;
  })
  .handleType(ON_MOUSE_UP, (state: RootState, action: PayloadAction<string, MouseEvent>) => {
    if (action.payload.key === MouseKey.LEFT) {
      return ({
        ...state,
        mouseLeft: undefined,
      });
    }
    if (action.payload.key === MouseKey.MIDDLE) {
      return ({
        ...state,
        mouseMiddle: undefined,
      });
    }
    if (action.payload.key === MouseKey.RIGHT) {
      return ({
        ...state,
        mouseRight: undefined,
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
  });
  
export default reducer;