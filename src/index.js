import React from 'react';
import ReactDOM from 'react-dom';
import { keys } from 'lodash';
import LevelSelector from './components/minesweeper-level-selector.js';
import MinesweeperGame from './components/minesweeper-game.js';
import MinesweeperGameModel from './model/minesweeper-game-model.js';
import MouseModel from './model/mouse-model.js';
import './css/minesweeper.css';
import 'bootstrap/dist/css/bootstrap.css';


class MinesweeperApp extends React.Component {

  constructor(props) {
    super();
    this.setEventHandlers = this.setEventHandlers.bind(this);
    this.onDifficultySelected = this.onDifficultySelected.bind(this);

    var defaultLevel = "easy";
    var game = new MinesweeperGameModel(this.levelsAvailable()[defaultLevel]);
    var mouse = new MouseModel();
    this.setEventHandlers(mouse, game);
    this.state = {
      game:game,
      mouse: mouse,
      selectedLevel: defaultLevel,
      scores: { "easy":{}, "intermediate":{}, "expert":{}},

    };
  }

  setEventHandlers(mouse, game){
    mouse.addEventHandler({
      mouseUp: game.onMouseUp,
      mouseDown: game.onMouseDown,
      mouseOut: game.onMouseOut,
      mouseOver: game.onMouseOver,
      onStateChanged: (eventName, e, sender) => { 
        this.setState({ mouse: sender });
      },
    });
    mouse.addEventHandler({
      mouseDown: (eventName, e, sender) => {
        if (!this.state.game.isGameOver()){
          this.state.game.header.smileyButton.setOoh();
        }
      },
      mouseUp: (eventName, e, sender) => {
        if (!this.state.game.isGameOver()){
          this.state.game.header.smileyButton.setSmile();
        }
      },
    });
    game.addEventHandler({
      onStateChanged: (eventName, e, sender) => {
        this.setState({game: sender});
      },
    });
  }

  levelsAvailable(){
    return {
      "easy": {
        "mines":10,
        "width": 9,
        "height": 9
      },
      "intermediate": {
        "mines": 40,
        "width": 16,
        "height": 16
      },
      "expert" : {
        "mines" :99,
        "width": 30,
        "height": 16
      }
    };
  }

  onDifficultySelected(dif){
    this.setState({ selectedLevel: dif });
    this.state.game.restartGame(
      this.levelsAvailable()[dif]
    );
  }

  calcStyle(settings){
    var fieldWidth = 16, borderWidth = 10;
    return {
      "width": fieldWidth * settings.width + 2 * borderWidth,
      "height": fieldWidth * settings.height
    }
  }

  render() {
    const { game, mouse, selectedLevel } = this.state;
    return (
      <div>
        <div className="row" >
          <div className="col-xs-6 z100">
            <LevelSelector choices={keys(this.levelsAvailable())} 
                selectedChoice={selectedLevel}
                innitGameCallback={this.onDifficultySelected} />
            <MinesweeperGame game={game} mouse={mouse}/>
          </div>
        </div>  
      </div>  
    );
  } 
}

ReactDOM.render(<MinesweeperApp />, document.getElementById('root'));
