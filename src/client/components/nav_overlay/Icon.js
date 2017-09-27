import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import Icons from '../../constants/icons'

const Icon =({name, size, color, onClick, onMouseOver, onMouseLeave, style})=>
  <i
    className='material-icons'
    style={merge({}, Icon.defaultStyles, style).base}
    onClick={onClick}
    onMouseOver={onMouseOver}
    onMouseLeave={onMouseLeave}
  >
    {name}
  </i>

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(Icons)).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func
}

Icon.defaultProps = {
  onClick: ()=>{}
}

Icon.defaultStyles = {
  base:{
    fontSize: 34,
    color: 'inherit',
    marginRight: 10
  }
}

export default Icon