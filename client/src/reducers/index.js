import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  CREATE_TICKET,
  CREATE_TICKET_FAILURE,
  CREATE_TICKET_SUBMITED } from '../actions'



const formTicketInitial = {
  isSubmitting: false,
  ticketCreatedSuccess: false,
  ticketCreatedFailure: false
}
const formTicket = (state = formTicketInitial, action) => {
  switch(action.type) {
    case CREATE_TICKET_SUBMITED:
      return { ...state, isSubmitting: true, ticketCreatedSuccess: false, ticketCreatedFailure: false }
    case CREATE_TICKET:
      return { ...state, ticketCreatedSuccess: true, isSubmitting: false }
    case CREATE_TICKET_FAILURE:
      return { ...state, ticketCreatedFailure: true, isSubmitting: false }
  }
  return state
}

const authenticationInitial = {
  isAuthenticated: false,
}
const authentication = ( state = authenticationInitial, action) => {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true }
    case UNAUTHENTICATED:
      return { ...state, isAuthenticated: false }
  }
  return state
}

const rootReducer = combineReducers({
  form,
  formTicket,
  authentication
})

export default rootReducer
