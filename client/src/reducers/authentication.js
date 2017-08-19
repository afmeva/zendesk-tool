import { AUTHENTICATED } from '../actions'

const authenticationInitial = {
  isAuthenticated: false,
}
export default ( state = authenticationInitial, action ) => {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, isAuthenticated: true }
  }
  return state
}
