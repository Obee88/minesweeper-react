import { RootState } from "./reducer";

export const getDifficulty = (state: RootState) => state.difficulty;
export const getTimeCounter = (state: RootState) => state.timeCounter;
export const getMinesCounter = (state: RootState) => state.minesCounter;
export const getSmileyButton = (state: RootState) => state.smileyButton;
