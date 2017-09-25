import { LOGIN, LOGOUT, PROFILE, REGISTER, AUTO_LOGIN } from '../actions/auth_actions'

const initialState = {
  isAuthenticated: null,
  profile: null,
}

export default function auth( state = initialState, action ) {
  switch(action.type){

    case LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.response
      }
    case LOGIN.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: null
      }
    case AUTO_LOGIN.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.response
      }
    case AUTO_LOGIN.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: null
      }
    case LOGOUT.SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        profile: null
      }
    case LOGOUT.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: null
      }
    case PROFILE.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.response
      }
    case PROFILE.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: null
      }
    case REGISTER.SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        profile: action.response
      }
    case REGISTER.FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        profile: null
      }
    default:
      return state
  }
}

/**
 * Selectors
 */

export const getAuthState = (state) => state.auth.isAuthenticated