import fetch from 'isomorphic-fetch'
import _reduce from 'lodash/reduce'
import * as tokenStorage from '../helpers/tokenStorage'

const API_SERVICE_URL = '/api'

const API_HEADERS =()=> {
  const accessToken = tokenStorage.getToken()
  const authHeader = accessToken ? {'Authorization': `JWT ${accessToken}`} : null

  return {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json',
    //...authHeader
  }
}

export const Methods = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export function objectToQueryString(obj){
  return _reduce(obj, (queryString, value, key) => {
    if(!value) return queryString
    const separator = queryString.length === 0 ? '?' : '&'
    return `${queryString}${separator}${key}=${value}`
  }, '')
}

export const callApi =(endpoint, method, obj)=>{

  const queryString = method === Methods.GET ? objectToQueryString(obj): ''
  const fullUrl = `${API_SERVICE_URL}/${endpoint}${queryString}`

  return fetch(fullUrl, {
    credentials: 'include',
    method,
    headers: API_HEADERS(),
    mode: 'cors',
    cache: 'no-cache',
    body: method !== Methods.GET ? JSON.stringify(obj) : null
  })
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {

      if(!response.ok) {
        tokenStorage.invalidateToken(response)
        return Promise.reject(json)
      }

      // set token if present in response
      tokenStorage.setToken(json)

      return json
    })
    .then(
      response => ({response}),
      error => ({error})
    )
}
