export const CREATE_TICKET = 'CREATE_TICKET'
export const CREATE_TICKET_FAILURE = 'CREATE_TICKET_FAILURE'
export const CREATE_TICKET_SUBMITED = 'CREATE_TICKET_SUBMITED'

const ticketResponse = (type, json) => {
  return {
    type: type,
    payload: json
  }
}
export function createTicket(props) {
  return dispatch => {
    let { subject, description } = props

    dispatch({ type: CREATE_TICKET_SUBMITED })
    return fetch('/api/ticket', {
      method: 'POST',
      body: JSON.stringify({ subject, description }),
      headers: {
        'content-type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(json => dispatch(ticketResponse(CREATE_TICKET, json)))
    .catch(json => dispatch(ticketResponse(CREATE_TICKET_FAILURE, json)))
  }
}
