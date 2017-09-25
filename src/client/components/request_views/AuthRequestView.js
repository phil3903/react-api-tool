import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from 'reactables'

const AuthRequestView =({value, onChange, isActive})=>{

  if(!isActive) return null
  const styles = {
    base:{
      border: 'none',
      borderRadius: 0,
      color: 'white',
    },
    active: null,
    hovered: null
  }
  return(
    <div style={ styles.base }>
    </div>
  )
}

export default AuthRequestView