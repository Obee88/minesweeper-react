import { range } from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { getGameConfig } from '../state/selectors';
import Cell from './Cell';

const Board = () => {
  const { height: h, width: w } = useSelector(getGameConfig);
  const border =  (key: string) => (<div key={key} className="borderlr" />);
  var divs = [];
  for (var y = 0; y < h; ++y) {
    divs.push(border(`${y}-l`));
    for (var x = 0; x < w; ++x){
      divs.push(
        <Cell
          key={`${y}-${x}`}
          x={x}
          y={y}
        />
      );
    }
    divs.push(border(`${y}-r`));
  }
  const line = range(w).map(i => <div key={i} className="bordertb" />);
  return (
    <div className="minesweeper-board" >
      {divs}
      <div className="borderbl" />{line}<div className="borderbr" />	
    </div>
  );
}

export default Board;
