import { take, takeEvery, put, call, select } from 'redux-saga/effects'
import get from 'lodash/get'
import { entityRequest } from './_root_saga'
import { REQUEST_CLIENT, updateUrlMethod, updateUrlInput, sendRequestEntity, saveRequestEntity } from '../actions/request_client_actions'
import { DOCS } from '../actions/docs_actions'
import { selectEnvironment, selectRoute } from '../reducers/docs_reducer'
import { selectParameters, selectUrl, selectMethod } from '../reducers/request_client_reducer'
import { populateResponse } from '../actions/response_client_actions'
import * as api from '../services/request_client_service'

/**
 * Bind Api Entities
 */
export const sendRequest = entityRequest.bind(null, sendRequestEntity, api.sendRequest)
export const saveRequest = entityRequest.bind(null, saveRequestEntity, api.saveRequest)

/**
 * Workers
 */

function* updateClientUrlBar(){
  const environment = yield select(selectEnvironment)
  const route = yield select(selectRoute)

  const PREFIX = get(environment, 'ssl') ? 'https://' : 'http://'
  const URL = get(environment, 'url', '')
  const BASE = get(environment, 'base') ? '/' + environment.base : ''
  const PORT = get(environment, 'port')  ? ':' + environment.port : ''
  const ENDPOINT = route.endpoint ? '/' + route.endpoint : ''

  const FULL_URL = `${PREFIX}${URL}${PORT}${BASE}${ENDPOINT}`

  yield put(updateUrlInput(FULL_URL))
  yield put(updateUrlMethod(route.method))
}

/**
 * Sagas
 */

function* watchEndpointManagerUpdates(){
  yield takeEvery(DOCS.LOAD_ENVIRONMENT, updateClientUrlBar)
  yield takeEvery(DOCS.LOAD_ROUTE, updateClientUrlBar)
}

function* watchSendRequest(){
  while (true) {
    yield take(REQUEST_CLIENT.EXECUTE_SEND_REQUEST)
    const parameters = yield select(selectParameters)
    const url = yield select(selectUrl)
    const method = yield select(selectMethod)
    yield call(sendRequest, url, method.toUpperCase(), parameters)
  }
}

function* watchSaveRequest(){
  yield take(REQUEST_CLIENT.EXECUTE_SAVE_REQUEST)
  //yield call(saveRequest)
}

export const requestClientSagas = [
  watchEndpointManagerUpdates,
  watchSendRequest,
  watchSaveRequest
]

