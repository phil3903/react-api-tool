import { take, takeEvery, put, call, select } from 'redux-saga/effects'
import { entityRequest } from './_root_saga'
import { selectUrl, selectMethod, selectFormParameterList, selectJsonInput } from '../reducers/request_client_reducer'
import { selectGroup, selectName } from '../reducers/save_request_reducer'
import { selectProfile } from '../reducers/profile_reducer'
import * as api from '../services/profile_service'
import { PROFILE, getProfileEntity, updateProfileEntity} from '../actions/profile_actions'
import { toSnakeCase } from '../helpers/string'

/**
 * Bind Api Entities
 */
export const updateProfile = entityRequest.bind(null, updateProfileEntity, api.updateProfile)
export const getProfile = entityRequest.bind(null, getProfileEntity, api.getProfile)

/**
 * Workers
 */

function* structureRoute(){

}


/**
 * Sagas
 */


function *watchProfileRequest(){
  while(true){
    yield take(PROFILE.LOAD)
    yield call(getProfile)
  }
}

function* watchSaveRequest(){
  while(true) {
    yield take(PROFILE.EXECUTE_SAVE)

    const profile = select(selectProfile)

    const json = yield select(selectJsonInput)
    const form = yield select(selectFormParameterList)
    const method = yield select(selectMethod)
    const endpoint = yield select(selectUrl)
    const group = yield select(selectGroup)
    const displayName = yield select(selectName)

    // check for duplicates
    const name = toSnakeCase(displayName)


    const request = {
      name,
      displayName,
      method,
      endpoint,
      group,
      json,
      form
    }

    console.log(request)
  }
}

function* watchDeleteRequest(){
  while(true){
    const {name} = yield take(PROFILE.EXECUTE_DELETE)

    const profile = select(selectProfile)
  }
}

export const profileSagas = [
  watchSaveRequest,
  watchProfileRequest
]



