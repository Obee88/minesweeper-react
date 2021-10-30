
export type GameConfig = {
  width: number;
  height: number;
  mines: number;
}

export type DifficultyOption = {
  label: string,
  config: GameConfig;
}

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