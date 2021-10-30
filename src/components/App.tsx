import React from 'react';
import DificultySelector from './DificultySelector';
import Game from './Game';

const App = () => {
  return (
    <div className="APP z100">
      <DificultySelector />
      <Game />
    </div>
  );
}
export default App;
