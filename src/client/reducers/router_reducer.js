import { UPDATE_ROUTER_CONTEXT } from '../actions/router_actions'

const initialState = {
  match: {},
  location: {},
  history: {},
  query: {}
}

export default function router( state = initialState, action ) {
  switch(action.type){

    case UPDATE_ROUTER_CONTEXT:
      return {...state,
        match: action.match,
        location: action.location,
        history: action.history,
        query: action.query
      }

    default:
      return state
  }
}

/**
 * Selectors
 */

export const selectPathname = (state) => state.router.location.pathname
export const selectQuery = (state) => state.router.query