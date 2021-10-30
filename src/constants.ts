export enum MouseKey {
  LEFT,
  RIGHT,
  MIDDLE,
}

export interface MouseEvent {
  key?: MouseKey;
  target: string,
}

export type Field = 'X' | 'x' | '0' | '1'  | '2'  | '3'  | '4'  | '5'  | '6'  | '7'  | '8' | undefined;

export enum Cell {
  blank = 'blank',
  pressed = 'pressed',
  bombflagged = 'bombflagged',
  bombrevealed = 'bombrevealed',
  bombmisflagged = 'bombmisflagged',
  bombdeath = 'bombdeath',
  open1 = 'open1',
  open2 = 'open2',
  open3 = 'open3',
  open4 = 'open4',
  open5 = 'open5',
  open6 = 'open6',
  open7 = 'open7',
  open8 = 'open8',
};

export enum SmileyButton {
   facesmile = 'facesmile',
   facepressed = 'facepressed',
   facewin = 'facewin',
   facedead = 'facedead',
   faceooh = 'faceooh',
};

export type GameConfig = {
  width: number;
  height: number;
  mines: number;
};

export type DifficultyOption = {
  label: string,
  config: GameConfig;
};

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    label: 'easy',
    config: {
      mines:10,
      width: 9,
      height: 9,
    },
  },
  {
    label: 'intermediate',
    config: {
      mines: 40,
      width: 16,
      height: 16,
    },
  },
  {
    label: 'expert',
    config: {
      mines :99,
      width: 30,
      height: 16,
    },
  }
];
