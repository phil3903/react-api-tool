import React from 'react'
import PropTypes from 'prop-types'
import colors from '../constants/colors'
import { Badge } from 'reactables'

const StatusCode =({code})=>{

  const styles = {
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

  return(
    <Badge style={ styles } text={ code }/>
  )
}

export default StatusCode