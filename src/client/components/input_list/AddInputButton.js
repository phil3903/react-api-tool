import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

const AddInputButton =({text, onClick, style})=>{

  const styles = merge({}, AddInputButton.defaultStyles, style)

  return(
    <span
      style={ styles.base }
      onClick={ onClick }
    >
      { text }
    </span>
  )
}

AddInputButton.defaultStyles = {
  base:{

  }
}

AddInputButton.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func.isRequired
}

AddInputButton.defaultProps = {
  text: 'Add Another',
  style: {}
}

export default AddInputButton