import { action } from "typesafe-actions";
import { DifficultyOption, MouseEvent, SmileyButton } from "../constants";

export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const setDifficulty = (difficulty: DifficultyOption) => action(SET_DIFFICULTY, difficulty);
export const SET_MINES_COUNTER = 'SET_MINES_COUNTER';
export const setMinesCounter = (value: number) => action(SET_MINES_COUNTER, value);
export const SET_TIME_COUNTER = 'SET_TIME_COUNTER';
export const setTimeCounter = (value: number) => action(SET_TIME_COUNTER, value);
export const SET_SMILEY_BUTTON = 'SET_SMILEY_BUTTON';
export const setSmileyButton = (value: SmileyButton) => action(SET_SMILEY_BUTTON, value);


export const ON_MOUSE_DOWN = 'ON_MOUSE_DOWN';
export const onMouseDown = (event: MouseEvent) => action(ON_MOUSE_DOWN, event);
export const ON_MOUSE_UP = 'ON_MOUSE_UP';
export const onMouseUp = (event: MouseEvent) => action(ON_MOUSE_UP, event);
export const ON_MOUSE_ENTER = 'ON_MOUSE_ENTER';
export const onMouseEnter = (event: MouseEvent) => action(ON_MOUSE_ENTER, event);
