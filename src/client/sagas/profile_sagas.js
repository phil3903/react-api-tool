import { take, call, select } from 'redux-saga/effects'
import { entityRequest } from './_root_saga'
import { selectUrl, selectMethod, selectFormList, selectJsonInput } from '../reducers/request_client_reducer'
import { selectGroup, selectName } from '../reducers/save_request_reducer'
import { selectProfile } from '../reducers/profile_reducer'
import { selectRoute } from '../reducers/docs_reducer'
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

function* addSavedRequest(request){
  let profile = yield select(selectProfile)
  const savedRequests = [...profile.savedRequests, request]
  yield call(updateProfile, {savedRequests})
}

function* removeSavedRequest(request){
  let profile = yield select(selectProfile)
  profile.savedRequests = profile.savedRequests.filter(r => r.name !== request.name)
  yield call(updateProfile, profile)
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

    const selectedRoute = yield select(selectRoute)
    const displayName = yield select(selectName)
    const name = toSnakeCase(displayName)

    const request = {
      name,
      displayName,
      doc_reference: selectedRoute.doc_reference,
      doc_display_name: selectedRoute.displayName,
      json: yield select(selectJsonInput),
      form: yield select(selectFormList),
      method: yield select(selectMethod),
      endpoint: yield select(selectUrl),
      group: yield select(selectGroup),
    }

    yield addSavedRequest(request)
  }
}

function* watchDeleteRequest(){
  while(true){
    const {route} = yield take(PROFILE.EXECUTE_DELETE)
    yield removeSavedRequest(route)
  }
}

export const profileSagas = [
  watchSaveRequest,
  watchProfileRequest,
  watchDeleteRequest
]



