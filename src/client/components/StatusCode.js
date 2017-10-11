import React from 'react'
import PropTypes from 'prop-types'
import colors from '../constants/colors'
import { Badge } from 'reactables'

const StatusCode =({code})=>{

  let styles = {
    base:{
      borderRadius: 2,
      color: colors.white,
      backgroundColor: colors.green['A400'],
      fontSize: 18,
      marginLeft: 10,
      padding: '0 15px',
      height: 36
    },
    hovered: null
  }

  if (!code) return null

  const errorRegex = /^4|^5|Error/
  const redirectRegex = /^3/

  if(errorRegex.test(code))
    styles.base.backgroundColor = colors.red['400']

  if(redirectRegex.test(code))
    styles.base.backgroundColor = colors.blue['400']

  return(
    <Badge style={ styles } text={ code }/>
  )
}

export default StatusCode