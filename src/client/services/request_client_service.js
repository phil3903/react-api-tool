import { Methods, callApi } from './api_request_client'

export const sendRequest =(url, method, obj)=> callApi(url, method.toUpperCase(), obj)
export const saveRequest =(obj)=> callApi('', Methods.POST, obj)