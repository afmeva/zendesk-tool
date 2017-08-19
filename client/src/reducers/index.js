import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import formTicket from './formTicket.js'
import authentication from './authentication.js'

const rootReducer = combineReducers({
  form,
  formTicket,
  authentication
})

export default rootReducer
