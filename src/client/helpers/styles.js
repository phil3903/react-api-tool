import { isValidElement } from 'react'
import { findDOMNode } from 'react-dom'
import get from 'lodash/get'

export const getStyleValue =(element, prop) =>{
  // if React element
  if(isValidElement(element)){
    element = findDOMNode(element)
  }
  const value = get(element, `style.${prop}`)
  return value && value.indexOf('%') <= -1
    ? parseInt(value)
    : parseInt(window.getComputedStyle(element)[prop], 10)
}