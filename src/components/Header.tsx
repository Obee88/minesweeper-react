import React, { useEffect, useRef } from 'react';
import { range } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getGameConfig, getMinesCounter, getTimeCounter, isClockRunning } from '../state/selectors';
import ThreeDigitCounter from './ThreeDigitCounter';
import SmileyButton from './SmileyButton';
import { clockTick } from '../state/actions';

const Header = () => {
  const dispatch = useDispatch();
  const config = useSelector(getGameConfig);
  const minesCounter = useSelector(getMinesCounter);
  const timeCounter = useSelector(getTimeCounter);
  const clockRunning = useSelector(isClockRunning);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (clockRunning) {
      intervalRef.current = setInterval(() => { dispatch(clockTick()); }, 1000);
    } else  if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [clockRunning, dispatch])
  const line = range(config.width).map(key => <div key={key} className="bordertb" />);
  return (
    <div className="msw-header">
      <div className="bordertl" />{line}<div className="bordertr" />
      <div className="borderlrlong"/>
      <ThreeDigitCounter value={minesCounter} id="mines" />
      <SmileyButton />
      <ThreeDigitCounter value={timeCounter} id="seconds"/>
      <div className="borderlrlong"/>
      <div className="borderjointl" />{line}<div className="borderjointr" />
    </div>
  );
}
export default Header;
