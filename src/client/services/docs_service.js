import { Methods, callApi } from './api'

export const getDocs =()=> callApi('docs', Methods.GET)