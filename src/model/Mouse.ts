export enum MouseKey {
  LEFT,
  RIGHT,
  MIDDLE,
}

export interface MouseClickEvent {
  key?: MouseKey;
  target: string,
}

export const getMouseKey = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  if (e.nativeEvent.button === 0) {
    return MouseKey.LEFT;
  }
  if (e.nativeEvent.button === 2) {
    return MouseKey.RIGHT;
  }
  return MouseKey.MIDDLE
};