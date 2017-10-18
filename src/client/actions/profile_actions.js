import {action, createRequestTypes, prefixActionTypes} from './_action'

export const PROFILE = prefixActionTypes('PROFILE',[
  'LOAD',
  'RESET',
  'EXECUTE_SAVE',
  'EXECUTE_DELETE',
  {GET_PROFILE: createRequestTypes('GET_PROFILE')},
  {UPDATE_PROFILE: createRequestTypes('UPDATE_PROFILE')},
])

/**
 * Action Creators
 */

export const reset =()=> action(PROFILE.RESET)

/**
 * Saga Triggers
 */

export const load =()=> action(PROFILE.LOAD)
export const executeSave =()=> action(PROFILE.EXECUTE_SAVE)
export const executeDelete =(name)=> action(PROFILE.EXECUTE_DELETE, {name})

/**
 * Saga Entity Requests
 */

export const getProfileEntity = {
  request: (query) => action(PROFILE.GET_PROFILE.REQUEST),
  success: (response) => action(PROFILE.GET_PROFILE.SUCCESS, {response}),
  failure: (error) => action(PROFILE.GET_PROFILE.FAILURE, {error})
}

export const updateProfileEntity = {
  request: (request) => action(PROFILE.UPDATE_PROFILE.REQUEST, {request}),
  success: (response) => action(PROFILE.UPDATE_PROFILE.SUCCESS, {response}),
  failure: (error) => action(PROFILE.UPDATE_PROFILE.FAILURE, {error})
}