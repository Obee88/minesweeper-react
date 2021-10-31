import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DIFFICULTY_OPTIONS } from '../model/Game';
import { setDifficulty } from '../state/actions';
import { getDifficulty } from '../state/selectors';
import './DificultySelector.css';

const DificultySelector = () => {
  const selectedDifficulty = useSelector(getDifficulty);
  const dispatch = useDispatch();
  return (
    <div className="DS_options">
      {DIFFICULTY_OPTIONS.map(option => (
        <button
          key={option.label}
          className={classNames('DS_option', { DS_option_active: selectedDifficulty.label === option.label })}
          onClick={() => {
            const act = setDifficulty(option);
            dispatch(act);
          }}
        >
          {option?.label}
        </button>
      ))}
    </div>
  );
}
export default DificultySelector;
