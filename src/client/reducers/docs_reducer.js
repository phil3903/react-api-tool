import { DOCS } from '../actions/docs_actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'

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

const groupRoutes =(response)=>{
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

export default function docs( state = initialState, action ) {
  switch(action.type){
    case DOCS.GET_DOCS.SUCCESS:
      return {
        ...state,
        ...groupRoutes(action.response),
      }
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

export const selectEnvironment =(state)=> state.docs.selectedEnvironment
export const selectRoute =(state)=> state.docs.selectedRoute
