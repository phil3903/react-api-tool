import {action, prefixActionTypes} from './_action'

export const EXPORT_RESPONSE = prefixActionTypes('EXPORT_RESPONSE',[
  'UPDATE_FORMAT',
  'ADD_COLUMN',
  'DELETE_COLUMN',
  'UPDATE_COLUMN_KEY',
  'UPDATE_COLUMN_VALUE',
  'UPDATE_FILE_NAME_INPUT',
  'EXECUTE_EXPORT_RESPONSE'

])

/**
 * Action Creators
 */

export const updateFormat =(format)=> action(EXPORT_RESPONSE.UPDATE_FORMAT, {format})
export const addColumn =()=> action(EXPORT_RESPONSE.ADD_COLUMN)
export const deleteColumn =(index) => action(EXPORT_RESPONSE.DELETE_COLUMN, {index})
export const updateColumnKey =(index, key) => action(EXPORT_RESPONSE.UPDATE_COLUMN_KEY, {index, key})
export const updateColumnValue =(index, value) => action(EXPORT_RESPONSE.UPDATE_COLUMN_VALUE, {index, value})
export const updateFileNameInput =(input)=> action(EXPORT_RESPONSE.UPDATE_FILE_NAME_INPUT, {input})

/**
 * Saga Triggers
 */

export const executeExportResponse =()=> action(EXPORT_RESPONSE.EXECUTE_EXPORT_RESPONSE)


