import {action, createRequestTypes, prefixActionTypes} from './_action'

export const DOCS = prefixActionTypes('DOCS',[
  'LOAD',
  'LOAD_ENVIRONMENT',
  'LOAD_ROUTE',
  {GET_DOCS: createRequestTypes('GET_DOCS')},
])

/**
 * Action Creators
 */

export const load =(docs)=> action(DOCS.LOAD, {docs})
export const loadEnvironment =(environment)=> action(DOCS.LOAD_ENVIRONMENT, {environment})
export const loadRoute =(route)=> action(DOCS.LOAD_ROUTE, {route})


/**
 * Saga Triggers
 */

/**
 * Saga Entity Requests
 */

export const docsEntity = {
  request: (app) => action(DOCS.GET_DOCS.REQUEST, {app}),
  success: (response) => action(DOCS.GET_DOCS.SUCCESS, {response}),
  failure: (error) => action(DOCS.GET_DOCS.FAILURE, {error})
}

