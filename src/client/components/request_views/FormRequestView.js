import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import colors from '../../constants/colors'
import { Button } from 'reactables'
import ParameterInput from '../ParameterInput'

const FormRequestView =({formParameterList, keyOptions, onKeyUpdate, onValueUpdate, onDelete, isActive, onAdd })=>{

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
      {formParameterList.map((item, i) =>
        <ParameterInput
          key={i}
          index={i}
          listLength={formParameterList.length}
          keyOptions={keyOptions}
          param={item.key}
          value={item.value}
          onValueUpdate={onValueUpdate}
          onKeyUpdate={onKeyUpdate}
          onDelete={onDelete}
          onAdd={onAdd}
        />
      )}

      {
        get(formParameterList[formParameterList.length - 1], 'value.length', {})
          ?
          <Button
            text={'Add Another'}
            style={styles.addButton}
            onClick={ onAdd }
          />
          : null
      }

    </div>
  )
}

export default FormRequestView