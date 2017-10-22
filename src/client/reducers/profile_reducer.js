import { PROFILE } from '../actions/profile_actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import merge from 'lodash.merge'
import get from 'lodash/get'
import { groupRoutes } from './docs_reducer'

const initialState = {
  payload: {
    savedRequests: []
  }
}

// export const groupRoutes =(routes)=>{
//   if(!routes || !routes.length) return []
//   const groupedRoutes = routes.reduce((obj, route)=>{
//
//     console.log(route, obj)
//
//     if(!route.group) route.group = 'Other'
//     if(!obj[route.group]) obj[route.group] = []
//
//     obj[route.group] = [...obj[route.group], route]
//
//     console.log(obj)
//
//     return obj
//   }, {})
//
//   for(const group of Object.keys(routes)){
//     sortBy(routes[group], ['method', 'displayName'])
//     reverse(routes[group])
//   }
//
//   return groupedRoutes
// }

export default function profile( state = initialState, action ) {
  switch(action.type){
    case PROFILE.GET_PROFILE.SUCCESS:
      return {
        ...state,
        payload: action.response,
        groupedRequests: groupRoutes(action.response.savedRequests)
      }
    case PROFILE.UPDATE_PROFILE.SUCCESS:
      return {
        ...state,
        payload: action.response,
        groupedRequests: groupRoutes(action.response.savedRequests)
      }
    case PROFILE.RESET:
      return initialState
    default:
      return state
  }
}

/**
 * Selectors
 */


export const selectProfile =(state)=> state.profile.payload
export const selectSavedRequestNames =(state)=> {
  const { savedRequests } = state.profile.payload
  return savedRequests.length ? savedRequests.map(request => request.name) : []
}