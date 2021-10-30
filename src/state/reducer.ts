import { createReducer, PayloadAction } from 'typesafe-actions';
import { DifficultyOption, DIFFICULTY_OPTIONS, SmileyButton } from '../constants';
import {
  SET_DIFFICULTY,
  SET_MINES_COUNTER,
  SET_TIME_COUNTER,
  SET_SMILEY_BUTTON,
} from './actions';

export type RootState = {
  difficulty: DifficultyOption,
  minesCounter: number,
  timeCounter: number,
  smileyButton: SmileyButton,
};

const initialState = {
  difficulty: DIFFICULTY_OPTIONS[0],
  minesCounter: DIFFICULTY_OPTIONS[0].config.mines,
  timeCounter: 0,
  smileyButton: SmileyButton.facesmile,
};

const reducer = createReducer<RootState>(initialState)
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
  }));
  
export default reducer;