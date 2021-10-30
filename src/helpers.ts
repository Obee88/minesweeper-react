import { MouseKey } from "./constants";

export const getCoordinatesFromKey = (key: string) => {
  const parts = key.split('_');
  return {
    x: parseInt(parts[0], 10),
    y: parseInt(parts[1], 10),
  };
}

export const getIndexFromCoordinates = (x: number, y: number, w: number) => y * w + x;

export const getMouseKey = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (e.nativeEvent.button === 0) {
    return MouseKey.LEFT;
  }
  if (e.nativeEvent.button === 2) {
    return MouseKey.RIGHT;
  }
  return MouseKey.MIDDLE
};