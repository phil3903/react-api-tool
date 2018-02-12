import { take, put } from 'redux-saga/effects'
import { DOCS, loadEnvironment} from '../actions/docs_actions'
import { updateFormInputList, updateJsonInput, updateParamInputList} from '../actions/request_client_actions'
import { listObj } from '../reducers/request_client_reducer'

/**
 * Bind Api Entities
 */

/**
 * Workers
 */


function* formatParamInputList(params){
  if(!params) return null

  return params.map(param =>({
    key: param.id ,
    value: ''
  }))


}

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

    console.log(route)

    //const params = yield formatParamInputList(route.params)

    // put the saved data in or default
    yield put(updateJsonInput(route.json || '{}'))
    yield put(updateFormInputList(route.form || [listObj]))
    //yield put(updateParamInputList(route.params))
  }
}

export const docsSaga = [
  watchInitialLoad,
  watchLoadRoute
]