import { createReducer, PayloadAction } from 'typesafe-actions';
import { DifficultyOption, DIFFICULTY_OPTIONS } from '../constants';
import {
  SET_DIFFICULTY,
} from './actions';

export type RootState = {
  difficulty: DifficultyOption,
};

const initialState = {
  difficulty: DIFFICULTY_OPTIONS[0],
};

const reducer = createReducer<RootState>(initialState)
  .handleType(SET_DIFFICULTY, (state: RootState, action: PayloadAction<string, DifficultyOption>) => ({
    ...state,
    difficulty: action.payload, 
  }));
  
export default reducer;