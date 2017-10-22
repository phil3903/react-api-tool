import { callApi } from './api_request_client'

const BASE_URL = 'http://localhost:8080/api'

export const getProfile =(obj)=> callApi(`${BASE_URL}/profile`, 'GET')
export const updateProfile =(obj)=> callApi(`${BASE_URL}/profile`, 'PUT', obj)