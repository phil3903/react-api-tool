import isObject from 'lodash/isObject'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRequestTypes(base){
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export function prefixActionTypes(prefix, actions){
  return actions.reduce((dict, action) => {
    return {...dict,
      ...isObject(action)
        ? (()=>{
          //access the single key
          const key = Object.keys(action)[0]
          const values = Object.keys(action[key])
            .reduce((dict, value) => ({...dict, [value]: `${prefix}_${key}_${value}`}),{})
          return {[key]: values}
        })()
        : {[action]: `${prefix}_${action}`}
    }
  }, {})
}

export function action(type, payload = {}) {
  return {type, ...payload}
}