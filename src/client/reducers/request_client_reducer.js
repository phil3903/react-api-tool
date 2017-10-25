import { REQUEST_CLIENT } from '../actions/request_client_actions'

const initialState = {
  subnav: 'format',
  requestFormat: 'form',
  requestFormatDisplay: 'Form',
  urlInput: '',
  urlMethod: '',
  formParameterList: [{key: '', value: ''}],
  jsonInput: '{}',
  isJsonValid: true
}

export default function requestClient( state = initialState, action ) {
  switch(action.type){
    case REQUEST_CLIENT.SET_SUBNAV:
      return {...state, subnav: action.subnav}
    case REQUEST_CLIENT.SET_REQUEST_FORMAT:
      return {...state,
        requestFormat: action.value,
        requestFormatDisplay: action.display
      }
    case REQUEST_CLIENT.UPDATE_URL_INPUT:
      return{...state, urlInput: action.input}
    case REQUEST_CLIENT.UPDATE_URL_METHOD:
      return {...state, urlMethod: action.method}

    case REQUEST_CLIENT.UPDATE_JSON_INPUT:
      return{...state,
        jsonInput: action.input
      }
    case REQUEST_CLIENT.UPDATE_FORM_INPUT_LIST:
      return {...state,
        formParameterList: action.input
      }

    case REQUEST_CLIENT.ADD_FORM_PARAMETER:
      return {...state,
        formParameterList: [...state.formParameterList, {key: '', value: ''}]
      }
    case REQUEST_CLIENT.DELETE_FORM_PARAMETER:
      return {...state,
        formParameterList: [
          ...state.formParameterList.slice(0 , action.index),
          ...state.formParameterList.slice(action.index + 1)
        ]
      }
    case REQUEST_CLIENT.UPDATE_FORM_PARAMETER_KEY:
      return {
        ...state,
        formParameterList: [
          ...state.formParameterList.slice(0 , action.index),
          {key: action.key || '', value: state.formParameterList[action.index].value},
          ...state.formParameterList.slice(action.index + 1)
        ]
      }
    case REQUEST_CLIENT.UPDATE_FORM_PARAMETER_VALUE:
      return {
        ...state,
        formParameterList: [
          ...state.formParameterList.slice(0 , action.index),
          {value: action.value, key: state.formParameterList[action.index].key},
          ...state.formParameterList.slice(action.index + 1)
        ]
      }

    case REQUEST_CLIENT.SET_JSON_VALIDATION:
      return {...state, isJsonValid: action.isValid}

    case REQUEST_CLIENT.RESET:
      return initialState
    default:
      return state
  }
}

/**
 * Selectors
 */

export const selectParameters =(state)=> {
  const { requestFormat, formParameterList, jsonInput } = state.requestClient

  if(requestFormat === 'form')
    return formParameterList.reduce((obj, param) => ({...obj, [param.key]: param.value}), {})

  if(requestFormat === 'json' && jsonInput.length)
    return JSON.parse(jsonInput)

}
export const selectMethod =(state)=> state.requestClient.urlMethod
export const selectUrl =(state)=> state.requestClient.urlInput
export const selectJsonInput = (state)=> state.requestClient.jsonInput
export const selectFormParameterList =(state)=> state.requestClient.formParameterList