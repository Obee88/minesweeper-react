import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '../constants';
import { getMouseKey } from '../helpers';
import { onMouseDown, onMouseEnter, onMouseUp } from '../state/actions';
import { getCellStatus, isLeftDown, isLeftPressed, isNeighbourPressed, isRightDown } from '../state/selectors';

interface props {
  x: number;
  y: number;
}

const CellComponent = ({ x, y } : props) => {
  const key = `${x}_${y}`;
  const dispatch = useDispatch();
  let cellStatus = useSelector(getCellStatus(x, y));
  const leftPressed = useSelector(isLeftPressed(key));
  const rightDown = useSelector(isRightDown);
  const leftDown = useSelector(isLeftDown);
  const neighbourPressed = useSelector(isNeighbourPressed(key))
  if (cellStatus === Cell.blank) {
    if (leftPressed || (leftDown && rightDown && neighbourPressed)) {
      cellStatus = Cell.pressed;
    }
  }
  return (
    <div
      key={key}
      className={`square ${cellStatus}`}
      onContextMenu={e => {e.preventDefault();}}
      onMouseDown={(e) => {
        dispatch(onMouseDown({ key: getMouseKey(e), target: key }));
        e.stopPropagation();
      }}
      onMouseUp={(e) => {
        dispatch(onMouseUp({ key: getMouseKey(e), target: key }));
        e.stopPropagation();
      } }
      onMouseOver={(e) => {
        dispatch(onMouseEnter({ target: key }));
        e.stopPropagation();
      }}
    />
  ); 
}
export default CellComponent;
