import { take, takeEvery, put, call, select } from 'redux-saga/effects'
import get from 'lodash/get'
import { entityRequest } from './_root_saga'
import { REQUEST_CLIENT, updateUrlMethod, updateUrlInput, sendRequestEntity, saveRequestEntity } from '../actions/request_client_actions'
import { DOCS } from '../actions/docs_actions'
import { selectEnvironment, selectRoute } from '../reducers/docs_reducer'
import { selectParameters, selectUrl, selectMethod, selectFormList, selectJsonInput } from '../reducers/request_client_reducer'
import * as responseActions from '../actions/response_client_actions'
import * as api from '../services/request_client_service'

/**
 * Bind Api Entities
 */
export const sendRequest = entityRequest.bind(null, sendRequestEntity, api.sendRequest)

/**
 * Workers
 */

function* updateClientUrlBar(){
  const route = yield select(selectRoute)
  const ENDPOINT = route.endpoint ? '/' + route.endpoint : ''
  yield put(updateUrlInput(ENDPOINT))
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

    const environment = yield select(selectEnvironment)
    const base = environment.fullUrl
    const parameters = yield select(selectParameters)
    const url = yield select(selectUrl)
    const method = yield select(selectMethod)

    yield call(sendRequest, base + url, method.toUpperCase(), parameters)
    yield put(responseActions.setSubnav('response'))
  }
}

export const requestClientSagas = [
  watchEndpointManagerUpdates,
  watchSendRequest
]

