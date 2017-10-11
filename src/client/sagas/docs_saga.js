import { take, put, call, select } from 'redux-saga/effects'
import { entityRequest } from './_root_saga'
import * as api from '../services/docs_service'
import { DOCS, docsEntity, loadEnvironment} from '../actions/docs_actions'
import { selectAllEnvironments } from '../reducers/docs_reducer'

/**
 * Bind Api Entities
 */
export const getDocs = entityRequest.bind(null, docsEntity, api.getDocs)

function* watchLoad(){
  while(true){
    yield take(DOCS.LOAD)
    yield call(getDocs)
    const environments = yield select(selectAllEnvironments)

    if(environments &&  environments.length){
      const env = process.env.NODE_ENV || 'development'
      const environment = environments.find(e => e.name === env) || environments[0]
      yield put(loadEnvironment(environment))
    }

  }
}

export const docsSaga = [
  watchLoad,
]