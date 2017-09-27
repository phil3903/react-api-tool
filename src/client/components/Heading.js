import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import colors from '../constants/colors'

const Heading =({size, text, onClick, style})=> {
  const sizes = {
    1: 24,
    2: 18,
    3: 16,
    4: 14
  }

  const styles = merge({}, {
      base: {
        padding: 0,
        margin: 0,
        fontSize: sizes[size],
        fontWeight: 500
      }
    },
    style
  )

  return(<h1 onClick={ onClick } style={ styles.base }>{text}</h1>)
}

Heading.propTypes = {
  size: PropTypes.oneOf([1,2,3, 4]).isRequired,
  text: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
}

Heading.defaultProps = {
  text: '',
  onClick: ()=>{}
}

export default Heading