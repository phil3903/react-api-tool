import lineNumbers from 'line-numbers'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import json2csv from 'json2csv'
import { RESPONSE_CLIENT } from '../actions/response_client_actions'
import { REQUEST_CLIENT } from '../actions/request_client_actions'
import { getPathsWithoutIndices, getPathsWithStar } from '../helpers/path'

const initialState = {
  subnav: 'response',
  exportFormat: '',
  payload: '',
  responseTime: '',
  statusCode: '',
  clientResponse: '',
  paths: [],
}



export default function responseClient( state = initialState, action ) {
  switch(action.type){
    /**
     * Load responses from RequestClient into Response reducer
     */
    case REQUEST_CLIENT.SEND_REQUEST.SUCCESS:

      const data = action.response.json

      return {
        ...state,
        payload: data,
        statusCode: get(action.response, 'metadata.status', 'Success'),
        clientResponse: lineNumbers(JSON.stringify(data, null, 2)),
        paths: getPathsWithStar(data)
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
    case RESPONSE_CLIENT.RESET:
      return initialState

    default:
      return state
  }
}

export const selectPayload =(state)=> state.responseClient.payload