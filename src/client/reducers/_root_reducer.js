import { combineReducers } from 'redux'
import auth from './auth_reducer'
import login from './login_reducer'
import router from './router_reducer'
import error from './error_reducer'
import docs from './docs_reducer'
import requestClient from './request_client_reducer'
import responseClient from './response_client_reducer'

export default combineReducers({
  error,
  auth,
  docs,
  login,
  requestClient,
  responseClient,
  router
})

