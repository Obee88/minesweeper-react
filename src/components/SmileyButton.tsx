import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameConfig, getSmileyButton } from '../state/selectors';
import { GameConfig, SmileyButton } from '../constants';
import { setSmileyButton } from '../state/actions';
import { includes } from 'lodash';

const getStyles = (config: GameConfig) => {
  const w = config.width;
  const margin = (w * 16 - 90 - 26) / 2;
  return {
    "marginLeft": `${margin}px`,
    "marginRight": `${margin}px`,
    "marginTop": "3px",
    "marginBottom": "3px"
  };
}

const Smiley = () => {
  const config = useSelector(getGameConfig);
  const smiley = useSelector(getSmileyButton);
  const dispatch = useDispatch();
  return (
    <div style={{'backgroundImage':'none'}}>
      <div id="smiley"
        className={smiley} style={getStyles(config)}
        onMouseDown={() => {
          dispatch(setSmileyButton(SmileyButton.facepressed));
        }}
        onMouseUp={() => {
          if (smiley === SmileyButton.facepressed){
            // this.fireEvent("onSmileyButtonClicked") //TODO: 
            dispatch(setSmileyButton(SmileyButton.facesmile));
          }
        }}
        onMouseOut={() => {
          const ignoreStates = [SmileyButton.facewin, SmileyButton.facedead, SmileyButton.facesmile];
          if (!includes(ignoreStates, smiley)) {
            dispatch(setSmileyButton(SmileyButton.facesmile));
          }
        }}
      />
    </div>
  );
}
export default Smiley;
