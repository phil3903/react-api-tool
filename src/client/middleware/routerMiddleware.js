import { UPDATE_HISTORY } from '../actions/router_actions'

export default function routerMiddleware(history) {
  return () => next => action =>{
    if(action.type !== UPDATE_HISTORY){
      return next(action)
    }

    const { payload: { method, args } } = action
    history[method](...args)
  }
}