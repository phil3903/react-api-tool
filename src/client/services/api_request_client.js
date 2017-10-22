import fetch from 'isomorphic-fetch'
import { objectToQueryString, Methods } from './api'

const API_HEADERS =()=> {
  return {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json'
  }
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
    .then(response =>
      response.json().then(json => ({json, response}))
    ).then(({json, response}) => {

      if(!response.ok) {
        return Promise.reject(json)
      }

      return ({metadata: response, json})
    })
    .then(
      response => ({response}),
      error => ({error})
    )
}

