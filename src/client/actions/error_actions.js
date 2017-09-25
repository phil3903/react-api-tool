import { action } from './_action'

export const SHOW_ERROR = 'SHOW_ERROR'
export const RESET_ERROR = 'RESET_ERROR'

export const showError =(error)=> action(SHOW_ERROR, {error})
export const resetError =()=> action(RESET_ERROR, {error: null})