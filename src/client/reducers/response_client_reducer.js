import lineNumbers from 'line-numbers'
import get from 'lodash/get'
import uniq from 'lodash/uniq'
import json2csv from 'json2csv'
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

      const data = action.response.json
      const paths = getPaths(data)

      const fields = paths.map(value => {
        const pathComponents = value.split('.')
        const label = pathComponents[pathComponents.length - 1]
        return {label, value, default: 'broken'}
      })

      const csv = json2csv({data, fields})

      console.log(csv)


      return {
        ...state,
        payload: data,
        statusCode: get(action.response, 'metadata.status', 'Success'),
        clientResponse: lineNumbers(JSON.stringify(data, null, 2))
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

const getPaths = (payload) =>{
  let paths = []
  const walk = function(obj, path){

    path = path || ""

    for(let n in obj){
      if (obj.hasOwnProperty(n)) {

        if(typeof obj[n] === "object" || Array.isArray(obj[n]))
          walk(obj[n], path + "." + n)

        paths.push(path + "." + n)
      }
    }
  }
  walk(payload, "")
  return uniq(paths.map(path => path.substring(1)))
}