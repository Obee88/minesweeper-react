import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './state/store';
import './css/minesweeper.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="Screen">
        <App />
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
