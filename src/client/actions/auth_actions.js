import { action, createRequestTypes } from './_action'

export const LOGIN = createRequestTypes('LOGIN')
export const LOGOUT = createRequestTypes('LOGOUT')
export const REGISTER = createRequestTypes('REGISTER')
export const PROFILE = createRequestTypes('PROFILE')
export const AUTO_LOGIN = createRequestTypes('AUTO_LOGIN')

export const EXECUTE_AUTO_LOGIN = 'EXECUTE_AUTO_LOGIN'
export const EXECUTE_LOGIN = 'EXECUTE_LOGIN'
export const EXECUTE_LOGOUT = 'EXECUTE_LOGOUT'
export const EXECUTE_REGISTER = 'EXECUTE_REGISTER'

export const loginEntity = {
  request: (username, password) => action(LOGIN.REQUEST, {username, password}),
  success: (response) => action(LOGIN.SUCCESS, {response}),
  failure: (error) => action(LOGIN.FAILURE, {error})
}

export const logoutEntity = {
  request: () => action(LOGOUT.REQUEST),
  success: (response) => action(LOGOUT.SUCCESS, {response}),
  failure: (error) => action(LOGOUT.FAILURE, {error})
}

export const registerEntity = {
  request: () => action(REGISTER.REQUEST),
  success: (response) => action(REGISTER.SUCCESS, {response}),
  failure: (error) => action(REGISTER.FAILURE, {error})
}

export const autoLoginEntity = {
  request: () => action(AUTO_LOGIN.REQUEST),
  success: (response) => action(AUTO_LOGIN.SUCCESS, {response}),
  failure: (error) => action(AUTO_LOGIN.FAILURE, {error})
}

export const profileEntity = {
  request: () => action(PROFILE.REQUEST),
  success: (response) => action(PROFILE.SUCCESS, {response}),
  failure: (error) => action(PROFILE.FAILURE, {error})
}

export const executeAutoLogin =()=> action(EXECUTE_AUTO_LOGIN)
export const executeLogin =({username, password, remember}) => action(EXECUTE_LOGIN, {username, password, remember})
export const executeRegister =({username, displayName, emailAddress, password})=>
  action(EXECUTE_REGISTER, {username, displayName, emailAddress, password})
export const executeLogout =() => action(EXECUTE_LOGOUT)