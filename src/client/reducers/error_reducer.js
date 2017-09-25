import { SHOW_ERROR, RESET_ERROR} from '../actions/error_actions'

export default function error(state = null, action){

  const { type, error } = action

  if(type === '' || type === RESET_ERROR) return null

  else if (error){
    console.log(error)
    return action.type !== '' ? action.error : null
  }


  return state
}