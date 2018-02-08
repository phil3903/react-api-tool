import { EXPORT_RESPONSE } from '../actions/export_response_actions'

const exportObj = {key: '', value: ''}

const initialState = {
  format: '',
  columns: [exportObj],
}

export default function exportResponse( state = initialState, action ) {
  switch(action.type){
    case EXPORT_RESPONSE.UPDATE_FORMAT:
      return {...state, format: action.format }
    case EXPORT_RESPONSE.ADD_COLUMN:
      return {...state,
        columns: [...state.columns, exportObj]
      }
    case EXPORT_RESPONSE.DELETE_COLUMN:
      return {...state,
        columns: [
          ...state.columns.slice(0 , action.index),
          ...state.columns.slice(action.index + 1)
        ]
      }
    case EXPORT_RESPONSE.UPDATE_COLUMN_KEY:
      return {...state,
        columns: [
          ...state.columns.slice(0 , action.index),
          {key: action.key || '' , value: state.columns[action.index].value},
          ...state.columns.slice(action.index + 1)
        ]
      }
    case EXPORT_RESPONSE.UPDATE_COLUMN_VALUE:
      return {...state,
        columns: [
          ...state.columns.slice(0 , action.index),
          {value: action.value, key: state.columns[action.index].key},
          ...state.columns.slice(action.index + 1)
        ]
      }

    default:
      return state
  }
}

/**
 * Saga Selectors
 */


export const selectExportOptions =(state)=> state.exportResponse

