import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

const ListInput =({value, style})=>{

  const styles = merge({}, ListInput.defaultStyles, style)

  return(
    <li style={ styles.base }>
      <input style={ styles.input.base } value={ value }/>
    </li>
  )
}

ListInput.defaultStyles = {
  base:{

  },
  input:{
    base:{

    }
  }
}

ListInput.propTypes = {
  style: PropTypes.object,
  value: PropTypes.string,
}

ListInput.defaultProps = {
  style: {},
  value: ''
}

export default ListInput