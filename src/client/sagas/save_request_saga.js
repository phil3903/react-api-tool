import { takeEvery, put, select } from 'redux-saga/effects'
import { SAVE_REQUEST, updateUniqueNameValidity } from '../actions/save_request_actions'
import {toSnakeCase} from '../helpers/string'
import {selectSavedRequestNames} from '../reducers/profile_reducer'

/**
 * Workers
 */

function* validateUniqueName(action){
  const input = toSnakeCase(action.input)
  const names = yield select(selectSavedRequestNames)
  const isNameUsed = names.some(name => name === input)
  yield put(updateUniqueNameValidity(!isNameUsed))
}

/**
 * Sagas
 */

function* watchUpdateRequestName(){
  yield takeEvery(SAVE_REQUEST.UPDATE_NAME_INPUT, validateUniqueName)
}

export const saveRequestSagas = [
  watchUpdateRequestName
]

