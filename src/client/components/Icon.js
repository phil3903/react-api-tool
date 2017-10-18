import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import Icons from '../constants/icons'

const Icon =({name, size, color, onClick, style})=>
  <i
    className='material-icons'
    onClick={ onClick ? onClick : ()=>{} }
    style={merge({}, style, {fontSize: size, color})}
  >
    {name}
  </i>

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(Icons)).isRequired,
  size: PropTypes.number,
  color: PropTypes.string
}

export default Icon