import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers';
import Routes from './routes';

import './index.css';

const store = createStore(rootReducer)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
