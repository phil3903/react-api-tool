import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import colors from '../../constants/colors'
import { Button } from 'reactables'
import ParameterInput from '../ParameterInput'

const ParamsRequestView =({
  paramList,
  keyOptions,
  onKeyUpdate,
  onValueUpdate,
  onDelete,
  isActive,
  onAdd
})=>{

  if(!isActive) return null

  const styles = {
    base:{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      padding: '20px 10px',
    },
    addButton:{
      base:{
        padding: 0,
        margin: 0,
        fontSize: 14,
        backgroundColor: 'transparent',
        color: colors.white
      },
      hovered:{
        color: colors.yellow[600],
        backgroundColor: 'transparent',
      }
    }
  }

  return(
    <div style={ styles.base }>


    </div>
  )
}

export default ParamsRequestView