import {action, createRequestTypes, prefixActionTypes} from './_action'

export const SAVE_REQUEST = prefixActionTypes('SAVE_REQUEST',[
  'LOAD',
  'RESET',
  'EXECUTE_SAVE',
  'SHOW_MODAL',
  'HIDE_MODAL',
  'UPDATE_GROUP_INPUT',
  'UPDATE_NAME_INPUT',
  {SAVE: createRequestTypes('SAVE')},
])

/**
 * Action Creators
 */

export const reset =()=> action(SAVE_REQUEST.RESET)
export const updateGroupInput =(input)=> action(SAVE_REQUEST.UPDATE_GROUP_INPUT, {input})
export const updateNameInput =(input)=> action(SAVE_REQUEST.UPDATE_NAME_INPUT, {input})
export const hideModal =()=> action(SAVE_REQUEST.HIDE_MODAL)
export const showModal =()=> action(SAVE_REQUEST.SHOW_MODAL)

/**
 * Saga Triggers
 */

export const load =()=> action(SAVE_REQUEST.LOAD)

/**
 * Saga Entity Requests
 */

