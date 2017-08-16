import auth0 from 'auth0-js';

export const CREATE_TICKET = 'CREATE_TICKET'
export const CREATE_TICKET_FAILURE = 'CREATE_TICKET_FAILURE'
export const CREATE_TICKET_SUBMITED = 'CREATE_TICKET_SUBMITED'

export const LOGIN = 'LOGIN'
export const AUTHENTICATED = 'AUTHENTICATED'
export const UNAUTHENTICATED = 'UNAUTHENTICATED'

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

const auth = new auth0.WebAuth({
    domain: 'afmeva.auth0.com',
    clientID: 'P2WVQwd43ryGxAM4LWWzes1eZhPOm7lt',
    redirectUri: `${window.location.href}`,
    audience: 'https://afmeva.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });


function setSession(authResult) {

   localStorage.setItem('access_token', authResult.accessToken)
   localStorage.setItem('id_token', authResult.idToken)

   let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
   localStorage.setItem('expires_at', expiresAt)
 }

function isAuthenticated() {
  let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
  return new Date().getTime() < expiresAt
}

export function checkLogin(value) {
  return dispatch => {
    if(isAuthenticated()) {
      dispatch({
        type: AUTHENTICATED
      })
      return
    }
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult);
        dispatch({
          type: AUTHENTICATED
        })
        return
      }
      auth.authorize()
    });
  }
}
