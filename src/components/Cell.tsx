import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Cell } from '../model/Cell';
import { getMouseKey, MouseKey } from '../model/Mouse';
import { onCellBothClick, onCellLeftClick, onCellRightClick, onMouseDown, onMouseEnter, onMouseUp } from '../state/actions';
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
        const mouseKey = getMouseKey(e);
        dispatch(onMouseUp({ key: mouseKey, target: key }));
        if (mouseKey === MouseKey.LEFT) {
          if (rightDown) {
            dispatch(onCellBothClick(x, y))
          } else {
            dispatch(onCellLeftClick(x, y));
          }
        } else if (mouseKey === MouseKey.RIGHT) {
          if (leftDown) {
            dispatch(onCellBothClick(x, y))
          } else {
            dispatch(onCellRightClick(x, y));
          }
        }
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
