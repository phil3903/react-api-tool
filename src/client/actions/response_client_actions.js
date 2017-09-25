import {action, createRequestTypes, prefixActionTypes} from './_action'

export const RESPONSE_CLIENT = prefixActionTypes('RESPONSE_CLIENT',[
  'LOAD',
  'RESET',
  'POPULATE'
])

/**
 * Action Creators
 */

export const reset =()=> action(RESPONSE_CLIENT.RESET)


/**
 * Saga Triggers
 */

export const load =()=> action(RESPONSE_CLIENT.LOAD)
