import React from 'react';
import { useSelector } from 'react-redux';
import { getDifficulty } from '../state/selectors';

const Game = () => {
  const difficulty = useSelector(getDifficulty);
  return (
    <div>{difficulty.label}</div>
  );
}
export default Game;
