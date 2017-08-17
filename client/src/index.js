import '@auth0/styleguide-core/build/core.min.css'
import '@auth0/styleguide-components/build/components.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
// redux
import { createStore, applyMiddleware  } from 'redux'
import { Provider } from 'react-redux'
import reduxThunk from 'redux-thunk'

import rootReducer from './reducers';
import CreateTicket from './create-ticket';

import './index.css';

const store = createStore(rootReducer, applyMiddleware(reduxThunk))

ReactDOM.render((
  <Provider store={store}>
    <CreateTicket />
  </Provider>
), document.getElementById('root'))
