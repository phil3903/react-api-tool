import { PROFILE } from '../actions/profile_actions'
import sortBy from 'lodash/sortBy'
import reverse from 'lodash/reverse'
import merge from 'lodash.merge'
import get from 'lodash/get'
import { groupRoutes, removeEndpointSlash } from './docs_reducer'

const initialState = {
  payload: {
    savedRequests: []
  }
}

const modifyRequests =(requests)=>{
  return requests.map(req => ({...req, endpoint: removeEndpointSlash(req.endpoint)})) || []
}

export default function profile( state = initialState, action ) {
  switch(action.type){
    case PROFILE.GET_PROFILE.SUCCESS:

      const savedRequests = modifyRequests(action.response.json.savedRequests)

      return {
        ...state,
        payload: {savedRequests},
        groupedRequests: groupRoutes(savedRequests)
      }
    case PROFILE.UPDATE_PROFILE.SUCCESS:
      const updatedRequests = modifyRequests(action.response.json.savedRequests)
      return {
        ...state,
        payload: {savedRequests: updatedRequests},
        groupedRequests: groupRoutes(updatedRequests)
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