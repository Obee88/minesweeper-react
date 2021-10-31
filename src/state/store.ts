import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { DifficultyOption, SmileyButton } from '../constants';
import { Cell } from '../model/Cell';
import { Field } from '../model/Field';
import reducer from './reducer';


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
  gameEnded: boolean,
};

export default createStore(reducer, applyMiddleware(thunk));
