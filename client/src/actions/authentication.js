import Auth from '../services/auth'

export const AUTHENTICATED = 'AUTHENTICATED'

const auth = new Auth()
const notifyAuthentication = () => ({ type: AUTHENTICATED })

export function checkLogin(value) {
  return dispatch => {
    if(auth.isAuthenticated()) {
      dispatch(notifyAuthentication())
      return
    }

    auth.parseResult(() => {
      dispatch(notifyAuthentication())
    })
  }
}
