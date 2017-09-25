import { Methods, callApi } from './api'

export const login =(username, password)=> callApi('login', Methods.POST, {username, password})
export const register =(username, displayName, emailAddress, password)=> callApi('register', Methods.POST, {username, displayName, emailAddress, password})
export const logout =()=> callApi('logout', Methods.POST)
export const autoLogin =()=> callApi('profile', Methods.GET, {})
export const changePassword =(password)=> callApi('changepassword', Methods.POST, {password})