import React from 'react'
import PropTypes from 'prop-types'
import colors from '../constants/colors'
import { Badge } from 'reactables'

const ResponseTime =({time})=>{

  const styles = {
    base:{
      borderRadius: 2,
      color: colors.white,
      backgroundColor: colors.blueGrey['500'],
      fontSize: 18,
      marginRight: 10,
      padding: '0 15px',
      height: 36
    },
    hovered: null
  }

  if (!time) return null

  return(
    <Badge style={ styles } text={ `${time}ms` }/>
  )
}

export default ResponseTime