import React from 'react'
import PropTypes from 'prop-types'
import { Button, SelectOption, Select, Checkbox } from 'reactables'
import icons from '../constants/icons'
import colors, {highlight, secondary} from '../constants/colors'
import Icon from './Icon'
import Input from './Input'

const ParameterInput =(
  {
    index,
    options,
    value,
    param,
    onAdd,
    onKeyUpdate,
    onValueUpdate,
    onDelete,
    listLength,
    isDisabled,
    onCheck
  })=>{
  
  const styles = {
    base:{
      display: 'flex',
      alignItems: 'center',
      height: 36,
      width: '100%',
      marginBottom: 30,
      opacity: isDisabled ? 0.5 : 1
    },
    select:{
      base:{
        display: 'flex',
        justifyContent: 'space-between',
        width: 150,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderRight: 'none',
        borderLeft: 'none',
        borderTop: 'none',
        borderBottom: `1px solid`,
        WebkitBorderRadius: 0,
        WebkitAppearance: 'none',
        borderColor: secondary,
        color: colors.white,
        height: 40,
        fontSize: 16,
      },
      active:{
        borderColor: secondary
      },
      focused:{
        borderColor: highlight
      },
      blur:{
        borderColor: secondary,
      },
      disabled: {
        borderColor: secondary
      }
    },
    deleteContainer:{
      position:'relative',
      width: 24,
      height: 24,
      marginLeft: 15
    },
    deleteButton:{
      base: {
        position: 'absolute',
        bottom: -13,
        right: 0,
        padding: 0,
        color: secondary,
        backgroundColor: 'transparent'
      },
      disabled:{
        color: colors.grey[800]
      },
      hovered: {
        backgroundColor: 'transparent',
        color: colors.yellow[600]
      }
    }
  }

  return(
    <div style={ styles.base }>

      <Checkbox
        isChecked={!isDisabled}
        onClick={(isChecked)=> onCheck(index, !isChecked)}
        size={14}
        style={{

        }}
      />

      {/* Key Param Select */}
      <Select
        style={styles.select}
        onChange={(value)=> onKeyUpdate(index, value)}
        value={ param }
        placeholder={'Parameter'}
        isDisabled={ !options.length }
      >
        {options ? options.map((option, i) =>
          <SelectOption
            style={ styles.dropdownOption }
            key={ i }
            text={option.name || ''}
            value={option.name || ''}
          />
        ) : null}
      </Select>


      {/* Value Dropdown */}

      <Input
        autoFocus
        placeholder={'value'}
        value={value}
        onChange={ (value)=> onValueUpdate(index, value) }
        onClick={()=>{}}
        isDisabled={!param}
        onEnterKey={ onAdd }
      />

      {/* options
        ? <Select
            style={styles.select}
            onChange={(value)=> onValueUpdate(index, value)}
            value={ param }
            placeholder={'Parameter'}
            isDisabled={ !options && !options.length }
          >
            { options.map(option =>
              <SelectOption
                style={ styles.dropdownOption }
                key={option}
                text={option}
                value={option}
              />
            )}
          </Select>

        : <Input
            autoFocus
            placeholder={'value'}
            value={value}
            onChange={ (value)=> onValueUpdate(index, value) }
            onClick={()=>{}}
            isDisabled={!param}
            onEnterKey={ onAdd }
          />
      */}

      <div style={styles.deleteContainer}>
        <Button
          style={ styles.deleteButton }
          text={<Icon name={icons.delete_forever} />}
          isDisabled={ listLength ? listLength <= 1 : true }
          onClick={ ()=> onDelete(index) }
        />
      </div>
    </div>
  )
}

export default ParameterInput 