import {
  UPDATE_LOGIN_USERNAME,
  UPDATE_LOGIN_DISPLAY_NAME,
  UPDATE_LOGIN_EMAIL_ADDRESS,
  UPDATE_LOGIN_PASSWORD,
  UPDATE_LOGIN_VERIFY,
  TOGGLE_REMEMBER,
  RESET_LOGIN_INPUTS
} from '../actions/login_actions'

const username = localStorage.getItem('username')

const initialState = {
  remember: !!username,
  username: username || '',
  password: '',
  loginAttempted: false
}

export default function login( state = initialState, action ) {
  switch(action.type){
    case UPDATE_LOGIN_USERNAME:
      return {...state, username: action.input}
    case UPDATE_LOGIN_DISPLAY_NAME:
      return {...state, displayName: action.input}
    case UPDATE_LOGIN_EMAIL_ADDRESS:
      return {...state, emailAddress: action.input}
    case UPDATE_LOGIN_PASSWORD:
      return {...state, password: action.input}
    case UPDATE_LOGIN_VERIFY:
      return {...state, verify: action.input}
    case TOGGLE_REMEMBER:
      return {...state, remember: action.isChecked}
    case RESET_LOGIN_INPUTS:
      return initialState
    default:
      return state
  }
}