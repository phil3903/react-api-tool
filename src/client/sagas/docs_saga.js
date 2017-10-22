import { take, put } from 'redux-saga/effects'
import { DOCS, loadEnvironment} from '../actions/docs_actions'
import { updateFormInputList, updateJsonInput} from '../actions/request_client_actions'

/**
 * Bind Api Entities
 */



/**
 * Sagas
 */

function* watchInitialLoad(){
  while(true){
    const {docs} = yield take(DOCS.LOAD)
    const { environments } = docs

    if(environments &&  environments.length){
      const env = process.env.NODE_ENV || 'development'
      const environment = environments.find(e => e.name === env) || environments[0]
      yield put(loadEnvironment(environment))
    }
  }
}


function* watchLoadRoute(){
  while(true){
    const { route } = yield take(DOCS.LOAD_ROUTE)
    yield put(updateJsonInput(route.json || '{}'))
    yield put(updateFormInputList(route.form || [{key: '', value: ''}]))
  }
}

export const docsSaga = [
  watchInitialLoad,
  watchLoadRoute
]