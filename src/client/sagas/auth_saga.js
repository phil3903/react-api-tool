import { take, put, call, select } from 'redux-saga/effects'
import { push } from '../actions/router_actions'
import { entityRequest } from './_root_saga'
import * as api from '../services/auth_service'
import * as tokenStorage from '../helpers/tokenStorage'
import { getAuthState } from '../reducers/auth_reducer'
import {
  loginEntity,
  logoutEntity,
  registerEntity,
  autoLoginEntity,
  EXECUTE_AUTO_LOGIN,
  EXECUTE_LOGIN,
  EXECUTE_LOGOUT,
  EXECUTE_REGISTER
} from '../actions/auth_actions'

/**
 * Bind Api Entities
 */
export const login = entityRequest.bind(null, loginEntity, api.login)
export const logout = entityRequest.bind(null, logoutEntity, api.logout)
export const register = entityRequest.bind(null, registerEntity, api.register)
export const autoLogin = entityRequest.bind(null, autoLoginEntity, api.autoLogin)


/**
 * Define Routes
 */
const DEFAULT_ROUTE = '/home'
const LOGIN_ROUTE = '/login'

/**
 * Workers
 */
function* handleAuthState(){
  const isAuthenticated = yield select(getAuthState)

  if(isAuthenticated)
    yield put(push(DEFAULT_ROUTE))

}

function* rememberLogin(remember, username){
  const isAuthenticated = yield select(getAuthState)

  if(!remember)
    localStorage.removeItem('username')

  if(isAuthenticated && remember)
    localStorage.setItem('username', username)
}

/**
 * Sagas
 */
function* watchAutoLogin(){
  while(true){
    yield take(EXECUTE_AUTO_LOGIN)
    yield call(autoLogin)
    const isAuthenticated = yield select(getAuthState)
    const pathname = isAuthenticated ? DEFAULT_ROUTE : LOGIN_ROUTE
    yield put( push(pathname) )
  }
}

function* watchLogin(){
  while(true){
    const { username, password, remember } = yield take(EXECUTE_LOGIN)
    yield call(login, username, password)
    yield rememberLogin(remember, username)
    yield handleAuthState()
  }
}

function* watchRegistration() {
  while(true){
    const { username, displayName, password, emailAddress } = yield take(EXECUTE_REGISTER)
    yield call(register, username, displayName, emailAddress, password)
  }
}

function* watchLogout(){
  while(true){
    yield take(EXECUTE_LOGOUT)
    yield call(logout)
    yield put( push(LOGIN_ROUTE) )
    tokenStorage.removeToken()
  }
}

export const authSagas = [
  watchAutoLogin,
  watchLogin,
  watchLogout,
  watchRegistration
]