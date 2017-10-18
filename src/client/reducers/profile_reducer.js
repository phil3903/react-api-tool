import { PROFILE } from '../actions/profile_actions'

const initialState = {
  groups: [],
  payload: {}
}

export default function profile( state = initialState, action ) {
  switch(action.type){
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