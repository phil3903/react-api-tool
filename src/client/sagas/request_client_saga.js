import { take, takeEvery, put, call, select } from 'redux-saga/effects'
import get from 'lodash/get'
import { entityRequest } from './_root_saga'
import { REQUEST_CLIENT, updateUrlMethod, updateUrlInput, sendRequestEntity, saveRequestEntity } from '../actions/request_client_actions'
import { DOCS } from '../actions/docs_actions'
import { selectEnvironment, selectRoute } from '../reducers/docs_reducer'
import {
  selectFormParameters, selectUrl, selectMethod, selectFormList, selectJsonInput,
  selectParamsParameters
} from '../reducers/request_client_reducer'
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

function* mergeUrlWithParams(base, url, params){
  url = url.split('/').reduce((string, segment, index)=>{
    if(segment.charAt(0) === ':'){
      segment = segment.slice(1)
      segment = params[segment]
    }
    return `${string}${index === 0 ? '' : '/'}${segment}`
  }, '')

  return base + url
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

    const formParameters = yield select(selectFormParameters)
    const paramsParameters = yield select(selectParamsParameters)

    const environment = yield select(selectEnvironment)
    const base = environment.fullUrl
    const url = yield select(selectUrl)
    const method = yield select(selectMethod)

    const fullUrl = yield mergeUrlWithParams(base, url, paramsParameters)

    yield call(sendRequest, fullUrl, method.toUpperCase(), formParameters)
    yield put(responseActions.setSubnav('response'))
  }
}

export const requestClientSagas = [
  watchEndpointManagerUpdates,
  watchSendRequest
]

