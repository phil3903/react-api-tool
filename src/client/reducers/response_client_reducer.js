import lineNumbers from 'line-numbers'
import get from 'lodash/get'
import { RESPONSE_CLIENT } from '../actions/response_client_actions'
import { REQUEST_CLIENT } from '../actions/request_client_actions'

const initialState = {
  subnav: 'response',
  exportFormat: '',
  payload: '',
  responseTime: '',
  statusCode: '',
  clientResponse: ''
}

export default function docs( state = initialState, action ) {
  switch(action.type){
    /**
     * Load responses from RequestClient into Response reducer
     */
    case REQUEST_CLIENT.SEND_REQUEST.SUCCESS:

      const payload = action.response.json
      return {
        ...state,
        payload,
        statusCode: get(action.response, 'metadata.status', 'Success'),
        clientResponse: lineNumbers(JSON.stringify(payload, null, 2))
      }
    case REQUEST_CLIENT.SEND_REQUEST.FAILURE:
      const requestError = get(action, 'error.message', action.error)
      const statusCode = get(action, 'error.status', 'Error')
      return {
        ...state,
        payload: requestError,
        statusCode,
        clientResponse: JSON.stringify(requestError, null, 2)
      }

    /**
     * RESPONSE_CLIENT
     */
    case RESPONSE_CLIENT.SET_SUBNAV:
      return {...state, subnav: action.subnav}

    case RESPONSE_CLIENT.UPDATE_RESPONSE_TIME:
      return {...state, responseTime: action.responseTime }


    case RESPONSE_CLIENT.SET_EXPORT_FORMAT:
      return {...state, exportFormat: action.format}

    

    case RESPONSE_CLIENT.RESET:
      return initialState

    default:
      return state
  }
}