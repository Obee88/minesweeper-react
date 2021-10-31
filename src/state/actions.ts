import { action } from "typesafe-actions";
import { DifficultyOption } from "../model/Game";
import { MouseClickEvent } from "../model/Mouse";
import { SmileyButton } from "../model/Smiley";

export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const setDifficulty = (difficulty: DifficultyOption) => action(SET_DIFFICULTY, difficulty);
export const SET_MINES_COUNTER = 'SET_MINES_COUNTER';
export const setMinesCounter = (value: number) => action(SET_MINES_COUNTER, value);
export const SET_TIME_COUNTER = 'SET_TIME_COUNTER';
export const setTimeCounter = (value: number) => action(SET_TIME_COUNTER, value);
export const SET_SMILEY_BUTTON = 'SET_SMILEY_BUTTON';
export const setSmileyButton = (value: SmileyButton) => action(SET_SMILEY_BUTTON, value);


export const ON_MOUSE_DOWN = 'ON_MOUSE_DOWN';
export const onMouseDown = (event: MouseClickEvent) => action(ON_MOUSE_DOWN, event);
export const ON_MOUSE_UP = 'ON_MOUSE_UP';
export const onMouseUp = (event: MouseClickEvent) => action(ON_MOUSE_UP, event);
export const ON_MOUSE_ENTER = 'ON_MOUSE_ENTER';
export const onMouseEnter = (event: MouseClickEvent) => action(ON_MOUSE_ENTER, event);

export const CLOCK_TICK = 'CLOCK_TICK';
export const clockTick = () => action(CLOCK_TICK);

export const CELL_LEFT_CLICK = 'CELL_LEFT_CLICK';
export const onCellLeftClick = (x: number, y: number) => action(CELL_LEFT_CLICK, { x, y });
export const CELL_RIGHT_CLICK = 'CELL_RIGHT_CLICK';
export const onCellRightClick = (x: number, y: number) => action(CELL_RIGHT_CLICK, { x, y });
export const CELL_BOTH_CLICK = 'CELL_BOTH_CLICK';
export const onCellBothClick = (x: number, y: number) => action(CELL_BOTH_CLICK, { x, y });

export const SMILEY_CLICK = 'SMILEY_CLICK';
export const onSmileyClick = () => action(SMILEY_CLICK);
