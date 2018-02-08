import { REQUEST_CLIENT } from '../actions/request_client_actions'

export const listObj = {
  key: '',
  value: '',
  type: '',
  isDisabled: false,
  choices: []
}

const initialState = {
  subnav: 'format',

  requestFormat: 'form',
  requestFormatDisplay: 'Form',

  urlInput: '',
  urlMethod: '',

  formList: [listObj],
  paramList: [listObj],
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
        formList: action.input
      }

    case REQUEST_CLIENT.ADD_FORM_PARAMETER:
      return {...state,
        formList: [...state.formList, listObj]
      }
    case REQUEST_CLIENT.DELETE_FORM_PARAMETER:
      return {...state,
        formList: deleteListObject(state.formList, action.index)
      }
    case REQUEST_CLIENT.DISABLE_FORM_PARAMETER:
      return {
        ...state,
        formList: updateListObject(state.formList, action.index, {
          isDisabled: action.isDisabled
        })
      }
    case REQUEST_CLIENT.UPDATE_FORM_PARAMETER_KEY:
      return {
        ...state,
        formList: updateListObject(state.formList, action.index, {
          key: action.key || ''
        })
      }
    case REQUEST_CLIENT.UPDATE_FORM_PARAMETER_VALUE:
      return {
        ...state,
        formList: updateListObject(state.formList, action.index, {
          value: action.value
        })
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
 * Helpers
 */

const updateListObject =(array, index, update)=>{
  const obj = array[index]
   return [
     ...array.slice(0 , index),
     {...obj, ...update},
     ...array.slice(index + 1)
   ]
  }

const deleteListObject =(array, index)=>{
  return [
    ...array.slice(0 , index),
    ...array.slice(index + 1)
  ]
}


/**
 * Selectors
 */

export const selectParameters =(state)=> {
  const { requestFormat, formList, jsonInput } = state.requestClient

  if(requestFormat === 'form')
    return formList.reduce((obj, param) => {
      if(param.isDisabled) return obj
      return {...obj, [param.key]: param.value}
    }, {})

  if(requestFormat === 'json' && jsonInput.length)
    return JSON.parse(jsonInput)

}
export const selectMethod =(state)=> state.requestClient.urlMethod
export const selectUrl =(state)=> state.requestClient.urlInput
export const selectJsonInput = (state)=> state.requestClient.jsonInput
export const selectFormList =(state)=> state.requestClient.formList