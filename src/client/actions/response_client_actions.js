import {action, createRequestTypes, prefixActionTypes} from './_action'

export const RESPONSE_CLIENT = prefixActionTypes('RESPONSE_CLIENT',[
  'LOAD',
  'RESET',
  'POPULATE',
  'UPDATE_RESPONSE_TIME',
  'SET_SUBNAV'
])

/**
 * Action Creators
 */

export const reset =()=> action(RESPONSE_CLIENT.RESET)
export const updateResponseTime =(responseTime) => action(RESPONSE_CLIENT.UPDATE_RESPONSE_TIME, {responseTime})
export const setSubnav =(subnav)=> action(RESPONSE_CLIENT.SET_SUBNAV, {subnav})


/**
 * Saga Triggers
 */

export const load =()=> action(RESPONSE_CLIENT.LOAD)
