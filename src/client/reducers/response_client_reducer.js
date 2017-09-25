import lineNumbers from 'line-numbers'
import get from 'lodash/get'
import { RESPONSE_CLIENT } from '../actions/response_client_actions'
import { REQUEST_CLIENT } from '../actions/request_client_actions'

const initialState = {
  payload: ''
}

export default function docs( state = initialState, action ) {
  switch(action.type){
    /**
     * Load responses from RequestClient into Response reducer
     */
    case REQUEST_CLIENT.SEND_REQUEST.SUCCESS:
      return {
        ...state,
        payload: action.response,
        clientResponse: lineNumbers(JSON.stringify(action.response, null, 2))
      }
    case REQUEST_CLIENT.SEND_REQUEST.FAILURE:
      console.log(action.error)
      const requestError = get(action, 'error.message', action.error)
      return {
        ...state,
        payload: requestError,
        clientResponse: JSON.stringify(requestError, null, 2)
      }
    case RESPONSE_CLIENT.RESET:
      return initialState

    default:
      return state
  }
}