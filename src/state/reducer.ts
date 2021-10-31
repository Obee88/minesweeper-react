import { createReducer, PayloadAction } from 'typesafe-actions';
import { initBoard } from '../model/Cell';
import { DifficultyOption, DIFFICULTY_OPTIONS } from '../model/Game';
import { MouseKey, MouseClickEvent } from '../model/Mouse';
import { SmileyButton } from '../model/Smiley';
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
  CELL_BOTH_CLICK,
} from './actions';
import { handleBothClick, handleLeftClick, handleRightClick } from './gameHelpers';
import { RootState } from './store';

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
  gameEnded: false,
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
  .handleType(ON_MOUSE_DOWN, (state: RootState, action: PayloadAction<string, MouseClickEvent>) => {
    if (state.gameEnded) return state;
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
  .handleType(ON_MOUSE_UP, (state: RootState, action: PayloadAction<string, MouseClickEvent>) => {
    if (state.gameEnded) return state;
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
  .handleType(ON_MOUSE_ENTER, (state: RootState, action: PayloadAction<string, MouseClickEvent>) => {
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
  .handleType(CELL_LEFT_CLICK, handleLeftClick)
  .handleType(CELL_RIGHT_CLICK, handleRightClick)
  .handleType(CELL_BOTH_CLICK, handleBothClick)
  .handleType(SMILEY_CLICK, (state: RootState) => (
    getInitialState(state.difficulty)
  ))
  .handleType(CLOCK_TICK, (state: RootState) => ({
    ...state,
    timeCounter: state.timeCounter + 1,
  }));

  
export default reducer;