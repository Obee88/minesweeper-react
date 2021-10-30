import { action } from "typesafe-actions";
import { DifficultyOption } from "../constants";

export const SET_DIFFICULTY = 'SET_DIFFICULTY';
export const setDifficulty = (difficulty: DifficultyOption) => action(SET_DIFFICULTY, difficulty);
