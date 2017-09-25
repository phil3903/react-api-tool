import { take, put, call, fork, select } from 'redux-saga/effects'
import { POPULATE_PERMALINK } from '../actions/permalink_actions'
import { selectPathname, selectQuery } from '../reducers/router_reducer'
import _invert from 'lodash/invert'

const PERMALINK_MAPPING = {
  page: 'contentPage',
  limit: 'contentLimit',
  sort: 'contentSort',
  order: 'contentOrder',
  term: 'contentTerm'
}

/**
 * Workers
 */
function* getQuery(){

}

function* getPermalink(){
  const mapping = _invert(PERMALINK_MAPPING)
  const pathname = yield select(selectPathname)
  const query = yield select(selectQuery)

}

/**
 * Sagas
 */
function* watchPermalink(){
  while(true){
    yield take(POPULATE_PERMALINK)
  }
}

export const permalinkSagas = [
  watchPermalink
]