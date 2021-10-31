import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Cell } from '../model/Cell';
import { Field } from '../model/Field';
import { DifficultyOption } from '../model/Game';
import { SmileyButton } from '../model/Smiley';
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
