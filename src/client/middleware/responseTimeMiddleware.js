import { REQUEST_CLIENT } from '../actions/request_client_actions'
import { updateResponseTime } from '../actions/response_client_actions'
import moment from 'moment'

export default function responseTimeMiddleware() {

  let startTime = null

  return store => next => action =>{
    if(action.type === REQUEST_CLIENT.SEND_REQUEST.REQUEST){
      startTime = moment()
    }

    if(action.type === REQUEST_CLIENT.SEND_REQUEST.SUCCESS ||
      action.type === REQUEST_CLIENT.SEND_REQUEST.FAILURE) {

      const diff = moment().diff(startTime)
      store.dispatch(updateResponseTime(diff))
    }

    return next(action)
  }
}