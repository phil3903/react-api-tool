import { put, call, fork, all } from 'redux-saga/effects'
import { authSagas } from './auth_saga'
import { permalinkSagas } from './permalink_saga'
import { docsSaga } from './docs_saga'
import { requestClientSagas } from './request_client_saga'
import { profileSagas } from './profile_sagas'
import { saveRequestSagas } from './save_request_saga'

export function* entityRequest(entity, apiFunc, ...args) {
  yield put( entity.request(...args) )
  const { response, error } = yield call(apiFunc, ...args)

  if(response)
    return yield put( entity.success(response) )
  else
    return yield put( entity.failure(error) )
}

export default function* root(){
  yield all([
    ...authSagas.map(saga => fork(saga)),
    ...permalinkSagas.map(saga => fork(saga)),
    ...docsSaga.map(saga => fork(saga)),
    ...requestClientSagas.map(saga => fork(saga)),
    ...profileSagas.map(saga => fork(saga)),
    ...saveRequestSagas.map(saga => fork(saga))
  ])
}