import { DOCS } from '../actions/docs_actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import get from 'lodash/get'

const initialState = {
  selectedRoute: {},
  selectedEnvironment: {}
}

// const mapEndpointMethods = (response) =>{
//   let routes = []
//   return {
//     ...response,
//     allRoutes: Object
//       .keys(response.routes)
//       .reduce((arr, method) =>
//         [...arr, ...response.routes[method].map(endpoint => ({...endpoint, method})) ] , routes )
//   }
// }

const modifyPayload =(response)=>{
  response = groupRoutes(response)
  response = setBaseUrl(response)
  return response
}

export const groupRoutes =(response)=>{
  const routes = response.routes.reduce((obj, route)=>{

    if(!route.group) route.group = 'Other'
    if(!obj[route.group]) obj[route.group] = []
    obj[route.group] = [...obj[route.group], route]
    return obj
  }, {})

  for(const group of Object.keys(routes)){
    sortBy(routes[group], ['method', 'displayName'])
    reverse(routes[group])
  }

  response.routes = routes
  return response
}

const setBaseUrl =(response)=>{
  response.environments.map(environment =>{
    const PREFIX = get(environment, 'ssl') ? 'https://' : 'http://'
    const URL = get(environment, 'url', '')
    const BASE = get(environment, 'base') ? '/' + environment.base : ''
    const PORT = get(environment, 'port')  ? ':' + environment.port : ''
    environment.fullUrl = `${PREFIX}${URL}${PORT}${BASE}`
  })

  return response
}

export default function docs( state = initialState, action ) {
  switch(action.type){
    case DOCS.GET_DOCS.SUCCESS:
      return {
        ...state,
        ...modifyPayload(action.response),
      }

    case DOCS.ADD_DOC:
      return {...state}
    case DOCS.LOAD_ENVIRONMENT:
      return{
        ...state,
        selectedEnvironment: action.environment
      }
    case DOCS.LOAD_ROUTE:
      return {
        ...state,
        selectedRoute: action.route
      }
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
