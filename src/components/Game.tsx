import React from 'react';
import { useSelector } from 'react-redux';
import { GameConfig } from '../constants';
import { getDifficulty } from '../state/selectors';
import Header from './Header';

const BORDER_WIDTH = 10;
const BORDER_HEIGHT = 10;
const FIELD_WIDTH = 16;
const FIELD_HEIGHT = 16;
const HEADER_HEIGHT = 32;

const calcStyle = (config: GameConfig) => {
  const widthFieldsNum = config.width;
  const heightFieldsNum = config.height;
  const width = 2 * BORDER_WIDTH + widthFieldsNum * FIELD_WIDTH;
  const height = 3 * BORDER_HEIGHT + FIELD_HEIGHT * heightFieldsNum + HEADER_HEIGHT;
  return { width, height };
}

const Game = () => {
  const { config } = useSelector(getDifficulty);
  return (
    <div id="game" className="msw" style={calcStyle(config)}>
      <Header />
      {/* <MinesweeperBoard />						 */}
    </div>
  );
}
export default Game;
