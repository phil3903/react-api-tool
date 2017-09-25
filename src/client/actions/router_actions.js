import { action } from './_action'
export const UPDATE_ROUTER_CONTEXT = 'UPDATE_ROUTER_CONTEXT'

export const updateRouterContext = ({match, location, history, query}) =>
  action(UPDATE_ROUTER_CONTEXT, {match, location, history, query})

/**
 * push & replace middleware
 */

export const UPDATE_HISTORY = 'UPDATE_HISTORY'

function updateLocation(method) {
  return (...args) => action(UPDATE_HISTORY, {
    payload: { method, args}
  })
}

export const push = updateLocation('push')
export const replace = updateLocation('replace')