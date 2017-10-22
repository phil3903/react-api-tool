import { SAVE_REQUEST } from '../actions/save_request_actions'

const initialState = {
  isModalVisible: false,
  group: '',
  name: '',
  isNameUnique: true
}

export default function saveRequest( state = initialState, action ) {
  switch(action.type){
    case SAVE_REQUEST.SHOW_MODAL:
      return {...state, isModalVisible: true}
    case SAVE_REQUEST.HIDE_MODAL:
      return {...state, isModalVisible: false}
    case SAVE_REQUEST.UPDATE_GROUP_INPUT:
      return {...state, group: action.input}
    case SAVE_REQUEST.UPDATE_NAME_INPUT:
      return {...state, name: action.input}
    case SAVE_REQUEST.UPDATE_UNIQUE_NAME_VALIDITY:
      return {...state, isNameUnique: action.isUnique}
    case SAVE_REQUEST.RESET:
      return initialState
    default:
      return state
  }
}

/**
 * Selectors
 */

export const selectGroup =(state)=> state.saveRequest.group
export const selectName =(state)=> state.saveRequest.name
