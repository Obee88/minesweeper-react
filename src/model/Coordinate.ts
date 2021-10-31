export type Coordinate = {
  x: number,
  y: number,
};

export const getCoordinatesFromKey = (key: string) => {
  const parts = key.split('_');
  return {
    x: parseInt(parts[0], 10),
    y: parseInt(parts[1], 10),
  };
}

export const getIndexFromCoordinates = (x: number, y: number, w: number) => y * w + x;
