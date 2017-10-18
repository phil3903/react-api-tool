import { callApi } from './api_request_client'

export const getProfile =(obj)=> callApi(`/profile/preferences/${process.env.APP_NAME}`, 'GET')
export const updateProfile =(obj)=> callApi(`/profile/preferences/${process.env.APP_NAME}`, 'PUT')