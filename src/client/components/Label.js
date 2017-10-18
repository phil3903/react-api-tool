import React from 'react'
import PropTypes from 'prop-types'
import {white} from '../constants/colors'

const Label =({text})=> {

  const styles = {
    base:{
      color: white,
      fontFamily: 'Lato-Bold'
    }
  }
  return (
    <label style={styles.base}>{text}</label>
  )
}

export default Label