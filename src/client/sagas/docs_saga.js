import { take, put, call, select } from 'redux-saga/effects'
import { entityRequest } from './_root_saga'
import * as api from '../services/docs_service'
import { DOCS, docsEntity} from '../actions/docs_actions'

/**
 * Bind Api Entities
 */
export const getDocs = entityRequest.bind(null, docsEntity, api.getDocs)

function* watchLoad(){
  while(true){
    yield take(DOCS.LOAD)
    yield call(getDocs)
  }
}

export const docsSaga = [
  watchLoad,
]