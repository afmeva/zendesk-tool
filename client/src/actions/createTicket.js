import { reset } from 'redux-form';

export const CREATE_TICKET = 'CREATE_TICKET'
export const CREATE_TICKET_FAILURE = 'CREATE_TICKET_FAILURE'
export const CREATE_TICKET_SUBMITED = 'CREATE_TICKET_SUBMITED'

const createTicketSuccess = (payload) => ({
  type: CREATE_TICKET,
  payload,
})

const createTicketFailure = (payload) => ({
  type: CREATE_TICKET_FAILURE,
  payload,
})

const createTicketSubmitted = (payload) => ({
  type: CREATE_TICKET_SUBMITED,
  payload,
})

export function createTicket(values) {
  return dispatch => {
    const { subject, description, costumer_name, costumer_email } = values

    const submitter_name = localStorage.getItem('name')
    const submitter_email = localStorage.getItem('email')

    dispatch(createTicketSubmitted())
    return fetch('/api/ticket', {
      method: 'POST',
      body: JSON.stringify({
        costumer_name,
        costumer_email,
        submitter_name,
        submitter_email,
        subject,
        description
      }),
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(response => response.json())
    .then(json => {
      if(json.err) {
        dispatch(createTicketFailure(json))
        return
      }
      dispatch(reset('ticket'))
      dispatch(createTicketSuccess(json))
    })
    .catch(json => dispatch(createTicketFailure(json)))
  }
}
