import { take, put, select } from 'redux-saga/effects'
import json2csv from 'json2csv'
import uniq from 'lodash/uniq'
import { EXPORT_RESPONSE } from '../actions/export_response_actions'
import { selectExportOptions } from '../reducers/export_response_reducer'
import { selectPayload } from '../reducers/response_client_reducer'
import { download } from '../services/file_exporter'

/**
 * Workers
 */


function* exportJSON(data){
  download('json', data, 'api_response')
}

function* exportCSV(data, columns){

  const fields = columns.map(({key, value}) =>
    ({label: value, value: key.split('.*.').join('.')}))

  const unwindPath = uniq(columns.map(col => col.key)
    .filter(string => string.indexOf('.*.') >= 0)
    .map(p => p.split('.*.')[0]))

  const csv = json2csv({data, fields, unwindPath })
  download('csv', csv, 'api_response')
}


/**
 * Sagas
 */

function* watchExportResponse(){
  while(true){
    yield take(EXPORT_RESPONSE.EXECUTE_EXPORT_RESPONSE)

    const { format, columns, fileName } = yield select(selectExportOptions)
    const data = yield select(selectPayload)

    if(format === 'csv') yield exportCSV(data, columns, fileName)
    if(format === 'json') yield exportJSON(data)
  }
}

export const exportResponseSagas = [
  watchExportResponse
]

