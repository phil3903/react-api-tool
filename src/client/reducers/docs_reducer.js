import { DOCS } from '../actions/docs_actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import merge from 'lodash.merge'
import get from 'lodash/get'

const initialState = {
  selectedRoute: {},
  selectedEnvironment: {},
  groupedRoutes: {}
}

const modifyPayload =(docs)=>{
  docs.routes = docs.routes.map(route => ({...route, doc_reference: route.name}))
  docs = setBaseUrl(docs)
  return docs
}

export const groupRoutes =(routes)=>{
  if(!routes || !routes.length) return []
  const groupedRoutes = routes.reduce((obj, route)=>{

    if(!route.group) route.group = 'Other'
    if(!obj[route.group]) obj[route.group] = []

    obj[route.group] = [...obj[route.group], route]


    return obj
  }, {})

  for(const group of Object.keys(routes)){
    sortBy(routes[group], ['method', 'displayName'])
    reverse(routes[group])
  }

  return groupedRoutes
}

const setBaseUrl =(docs)=>{
  docs.environments.map(environment =>{
    const PREFIX = get(environment, 'ssl') ? 'https://' : 'http://'
    const URL = get(environment, 'url', '')
    const BASE = get(environment, 'base') ? '/' + environment.base : ''
    const PORT = get(environment, 'port')  ? ':' + environment.port : ''
    environment.fullUrl = `${PREFIX}${URL}${PORT}${BASE}`
  })

  return docs
}

export default function docs( state = initialState, action ) {
  switch(action.type){
    case DOCS.LOAD:
      const docs = modifyPayload(action.docs)
      const groupedRoutes = groupRoutes(docs.routes)
      return {...state, ...docs, groupedRoutes}

    case DOCS.ADD_DOC:
      return {...state}
    case DOCS.LOAD_ENVIRONMENT:
      return{
        ...state,
        selectedEnvironment: action.environment
      }
    case DOCS.LOAD_ROUTE:
      const referenceRoute = state.routes.find(route => route.name === action.route.doc_reference)
      const selectedRoute = merge({}, referenceRoute, action.route)
      return {...state, selectedRoute}
    case DOCS.RESET:
      return initialState
    default:
      return state
  }
}

/**
 * Selectors
 */

export const selectAllEnvironments =(state) => state.docs.environments
export const selectEnvironment =(state)=> state.docs.selectedEnvironment

export const selectAllRoutes =(state)=> state.docs.routes
export const selectRoute =(state)=> state.docs.selectedRoute
