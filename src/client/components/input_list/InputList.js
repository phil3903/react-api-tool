import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import AddInputButton from './AddInputButton'
import ListInput from './ListInput'

const InputList =({values, style})=>{

  const styles = merge({}, InputList.defaultStyles, style)
  const shouldShowAdd = values[values.length].length > 0

  return(
    <ul style={ styles.base }>
      <ListInput />
    </ul>
  )
}

InputList.defaultStyles = {
  base:{

  }
}

InputList.propTypes = {
  style: PropTypes.object,
  values
}

InputList.defaultProps = {
  style: {}
}

export default InputList