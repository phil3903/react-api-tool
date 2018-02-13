import {action, createRequestTypes, prefixActionTypes} from './_action'

export const REQUEST_CLIENT = prefixActionTypes('REQUEST_CLIENT',[
  'LOAD',
  'RESET',
  'EXECUTE_SEND_REQUEST',
  'EXECUTE_SAVE_REQUEST',
  'UPDATE_URL_INPUT',
  'UPDATE_URL_METHOD',
  'SET_SUBNAV',
  'SET_REQUEST_FORMAT',

  'UPDATE_JSON_INPUT',
  'SET_JSON_VALIDATION',

  'UPDATE_FORM_INPUT_LIST',
  'ADD_FORM_PARAMETER',
  'DELETE_FORM_PARAMETER',
  'DISABLE_FORM_PARAMETER',
  'UPDATE_FORM_PARAMETER_KEY',
  'UPDATE_FORM_PARAMETER_VALUE',

  'UPDATE_PARAMS_INPUT_LIST',
  'ADD_PARAMS_PARAMETER',
  'DELETE_PARAMS_PARAMETER',
  'DISABLE_PARAMS_PARAMETER',
  'UPDATE_PARAMS_PARAMETER_KEY',
  'UPDATE_PARAMS_PARAMETER_VALUE',

  'SHOW_SAVE_MODAL',
  'HIDE_SAVE_MODAL',
  {SEND_REQUEST: createRequestTypes('SEND_REQUEST')},
  {SAVE_REQUEST: createRequestTypes('SAVE_REQUEST')}
])

/**
 * Action Creators
 */

export const reset =()=> action(REQUEST_CLIENT.RESET)

// request url bar
export const updateUrlInput =(input)=> action(REQUEST_CLIENT.UPDATE_URL_INPUT, {input})
export const updateUrlMethod =(method)=> action(REQUEST_CLIENT.UPDATE_URL_METHOD, {method})

//client subnav and input control
export const setSubnav =(subnav)=> action(REQUEST_CLIENT.SET_SUBNAV, {subnav})
export const setRequestFormat =(value, display)=> action(REQUEST_CLIENT.SET_REQUEST_FORMAT, {value, display})

export const updateJsonInput =(input)=> action(REQUEST_CLIENT.UPDATE_JSON_INPUT, {input})
export const setJsonValidation =(isValid)=> action(REQUEST_CLIENT.SET_JSON_VALIDATION, {isValid})

export const updateFormInputList =(input)=> action(REQUEST_CLIENT.UPDATE_FORM_INPUT_LIST, {input})
export const addFormParameter =()=> action(REQUEST_CLIENT.ADD_FORM_PARAMETER)
export const deleteFormParameter =(index)=> action(REQUEST_CLIENT.DELETE_FORM_PARAMETER, {index})
export const disableFormParameter =(index, isDisabled)=> action(REQUEST_CLIENT.DISABLE_FORM_PARAMETER, {index, isDisabled})
export const updateFormParameterKey =(index, key) => action(REQUEST_CLIENT.UPDATE_FORM_PARAMETER_KEY, {index, key})
export const updateFormParameterValue =(index, value) => action(REQUEST_CLIENT.UPDATE_FORM_PARAMETER_VALUE, {index, value})


export const updateParamsInputList =(input)=> action(REQUEST_CLIENT.UPDATE_PARAMS_INPUT_LIST, {input})
export const addParamsParameter =()=> action(REQUEST_CLIENT.ADD_PARAMS_PARAMETER)
export const deleteParamsParameter =(index)=> action(REQUEST_CLIENT.DELETE_PARAMS_PARAMETER, {index})
export const disableParamsParameter =(index, isDisabled)=> action(REQUEST_CLIENT.DISABLE_PARAMS_PARAMETER, {index, isDisabled})
export const updateParamsParameterKey =(index, key) => action(REQUEST_CLIENT.UPDATE_PARAMS_PARAMETER_KEY, {index, key})
export const updateParamsParameterValue =(index, value) => action(REQUEST_CLIENT.UPDATE_PARAMS_PARAMETER_VALUE, {index, value})


/**
 * Saga Triggers
 */

export const load =()=> action(REQUEST_CLIENT.LOAD)
export const executeSendRequest =()=> action(REQUEST_CLIENT.EXECUTE_SEND_REQUEST)
export const executeSaveRequest=()=> action(REQUEST_CLIENT.EXECUTE_SAVE_REQUEST)

/**
 * Saga Entity Requests
 */

export const sendRequestEntity = {
  request: (query) => action(REQUEST_CLIENT.SEND_REQUEST.REQUEST, {...query}),
  success: (response) => action(REQUEST_CLIENT.SEND_REQUEST.SUCCESS, {response}),
  failure: (error) => action(REQUEST_CLIENT.SEND_REQUEST.FAILURE, {error})
}

