import React from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import colors from '../../constants/colors'
import { Button } from 'reactables'
import ParameterInput from '../ParameterInput'

const FormRequestView =({
  formList,
  options,
  onKeyUpdate,
  onValueUpdate,
  onDelete,
  isActive,
  onAdd,
  onCheckParameter
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

  const getChoices =(opts, item)=>{
    const option = opts.find(o => o.name === item.key)
    if(!option) return null

    // Choices should trump option.type
    return get(option, 'choices', null)
  }

  return(
    <div style={ styles.base }>
      {formList.map((item, i) =>
        <ParameterInput
          key={i}
          index={i}
          listLength={formList.length}
          param={item.key}
          value={item.value}
          type={item.type}
          options={options || []}
          isDisabled={item.isDisabled}
          choices={ getChoices(options, item) }
          onValueUpdate={onValueUpdate}
          onKeyUpdate={onKeyUpdate}
          onDelete={onDelete}
          onAdd={onAdd}
          onCheck={onCheckParameter}
        />
      )}

      {
        get(formList[formList.length - 1], 'value.length', {})
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