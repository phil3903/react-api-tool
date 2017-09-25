import { action } from './_action'

export const UPDATE_LOGIN_USERNAME = 'UPDATE_LOGIN_USERNAME'
export const UPDATE_LOGIN_DISPLAY_NAME = 'UPDATE_LOGIN_DISPLAY_NAME'
export const UPDATE_LOGIN_EMAIL_ADDRESS = 'UPDATE_LOGIN_EMAIL_ADDRESS'
export const UPDATE_LOGIN_PASSWORD = 'UPDATE_LOGIN_PASSWORD'
export const UPDATE_LOGIN_VERIFY = 'UPDATE_LOGIN_VERIFY'
export const TOGGLE_REMEMBER = 'TOGGLE_REMEMBER'
export const RESET_LOGIN_INPUTS = 'RESET_LOGIN_INPUTS'

export const updateLoginUsername = (input) => action(UPDATE_LOGIN_USERNAME, {input})
export const updateLoginDisplayName = (input) => action(UPDATE_LOGIN_DISPLAY_NAME, {input})
export const updateLoginEmailAddress = (input) => action(UPDATE_LOGIN_EMAIL_ADDRESS, {input})
export const updateLoginPassword = (input) => action(UPDATE_LOGIN_PASSWORD, {input})
export const updateLoginVerify = (input) => action(UPDATE_LOGIN_VERIFY, {input})
export const toggleRemember =(isChecked) => action(TOGGLE_REMEMBER, {isChecked})
export const resetLoginInputs = () => action(RESET_LOGIN_INPUTS)
