import { getCoordinatesFromKey } from "../helpers";
import { RootState } from "./reducer";

export const getDifficulty = (state: RootState) => state.difficulty;
export const getGameConfig = (state: RootState) => state.difficulty.config;
export const getWidth = (state: RootState) => getGameConfig(state).width;

export const getTimeCounter = (state: RootState) => state.timeCounter;
export const getMinesCounter = (state: RootState) => state.minesCounter;
export const getSmileyButton = (state: RootState) => state.smileyButton;

const getCellIndex = (x: number, y: number, w: number) => y * w + x;
export const getCellStatus = (x: number, y: number) =>
  (state: RootState) => state.board[getCellIndex(x, y, getWidth(state))];

const getMouseLeftElement = (state: RootState) => state.mouseLeft;
const getMouseRightElement = (state: RootState) => state.mouseRight;
export const isLeftPressed = (key: string) => (state: RootState) => getMouseLeftElement(state) === key;
export const isRightPressed = (key: string) => (state: RootState) => getMouseRightElement(state) === key;
export const isLeftDown = (state: RootState) => getMouseLeftElement(state) !== undefined;
export const isRightDown = (state: RootState) => getMouseRightElement(state) !== undefined;
export const isNeighbourPressed = (key: string) => (state: RootState) => {
  const mouseLeftElement = getMouseRightElement(state);
  if (!mouseLeftElement) {
    return false;
  }
  const { x, y } = getCoordinatesFromKey(key);
  const { x: X, y: Y } = getCoordinatesFromKey(mouseLeftElement);
  return Math.abs(x - X) <= 1 && Math.abs(y - Y) <= 1;
};

export const isClockRunning = (state: RootState) => state.clockRunning;
