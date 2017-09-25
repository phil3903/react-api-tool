import fetch from 'isomorphic-fetch'
import _reduce from 'lodash/reduce'
import * as tokenStorage from '../helpers/tokenStorage'

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

function objectToQueryString(obj){
  return _reduce(obj, (queryString, value, key) => {
    if(!value) return queryString
    const separator = queryString.length === 0 ? '?' : '&'
    return `${queryString}${separator}${key}=${value}`
  }, '')
}

export const callApi =(endpoint, method, obj)=>{

  const queryString = method === Methods.GET ? objectToQueryString(obj): ''
  const fullUrl = endpoint + queryString


  return fetch(fullUrl, {
    credentials: 'include',
    method,
    headers: API_HEADERS(),
    mode: 'cors',
    cache: 'no-cache',
    body: method !== Methods.GET ? JSON.stringify(obj) : null
  })
  .then(readResponse)
  .then(handleErrors)
  .then(({json, response}) => {

    if(!response.ok) return Promise.reject({json})
    return json
  })
  .then(
    response => ({response}),
    error => ({error})
  )
}


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

function readResponse(response){
  return response.json()
    .then(blob => {
      return {blob, response}
    })
}

