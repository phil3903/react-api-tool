import { UPDATE_LOGIN_PASSWORD, UPDATE_LOGIN_VERIFY } from '../actions/login_actions'
import { EXECUTE_REGISTER, EXECUTE_LOGIN, LOGIN } from '../actions/auth_actions'
import { createLogger } from 'redux-logger'

export const logger = createLogger({
  collapsed: true,
  stateTransformer: (state)=>{
    let { password } = state.login
    state.login.password = password.replace(/./g, '*')
    return state
  },
  actionTransformer: (action)=>{
    const redactedActions = [
      UPDATE_LOGIN_PASSWORD,
      UPDATE_LOGIN_VERIFY,
      EXECUTE_REGISTER,
      EXECUTE_LOGIN,
      LOGIN.REQUEST,
    ]

    if(redactedActions.some(act => act === action.type)){
      return {
        ...action,
        input: action.input ? 'REDACTED' : null,
        password: action.password ? 'REDACTED' : null,
        verify: action.verify ? 'REDACTED' : null
      }
    }

    return action
  }
})


export const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    throw err
  }
}