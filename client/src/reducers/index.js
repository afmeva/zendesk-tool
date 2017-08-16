import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import { CREATE_TICKET, CREATE_TICKET_FAILURE, CREATE_TICKET_SUBMITED } from '../actions'



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

const rootReducer = combineReducers({
  form,
  formTicket
})

export default rootReducer
