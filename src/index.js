import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
// redux
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Routes from './routes';

import './index.css';

// const store = createStore(reducer)
const store = createStore(() => {})

ReactDOM.render((
  <Provider>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))
