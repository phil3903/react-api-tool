import { take, put, select } from 'redux-saga/effects'
import json2csv from 'json2csv'
import uniq from 'lodash/uniq'
import { EXPORT_RESPONSE } from '../actions/export_response_actions'
import { selectExportOptions } from '../reducers/export_response_reducer'
import { selectPathsWithoutStars, selectPaths, selectPayload } from '../reducers/response_client_reducer'
import { download } from '../services/file_exporter'

/**
 * Workers
 */


function* exportJSON(data){
  download('json', data, 'api_response')
}

function* exportCSV(data, columns){

  const paths = yield select(selectPaths)

  columns = columns.filter(col => col.key)
  columns = columns.length ? columns : paths

  const fields = columns.map(col => {
    const key = col.key || col
    const value = col.value || col
    const path = key.split('.*.').join('.')
    const label = value || key
    return {label, value: path}
  })

  const unwindPath = uniq(columns.map(col => col.key || col)
    .filter(col => col.indexOf('.*.') >= 0)
    .map(p => p.split('.*.')[0]))

  console.log(fields, unwindPath)

  const csv = json2csv({data, fields, unwindPath })
  download('csv', csv, 'api_response')
}


/**
 * Sagas
 */

function* watchExportResponse(){
  while(true){
    yield take(EXPORT_RESPONSE.EXECUTE_EXPORT_RESPONSE)

    const { format, columns } = yield select(selectExportOptions)
    const data = yield select(selectPayload)

    if(format === 'csv') yield exportCSV(data, columns)
    if(format === 'json') yield exportJSON(data)
  }
}

export const exportResponseSagas = [
  watchExportResponse
]

