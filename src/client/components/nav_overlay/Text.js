import React from 'react'
import merge from 'lodash/merge'

const Text =({children, style})=>{

  const styles = merge({}, Text.defaultStyles, style)
  return(<p style={styles.base}>{children}</p>)
}

Text.defaultStyles = {
  base:{
    padding: 0,
    margin: 0,
    color: 'inherit'
  }
}

export default Text