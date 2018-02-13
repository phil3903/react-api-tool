import React from 'react'
import PropTypes from 'prop-types'
import { Button, SelectOption, Select, Checkbox, DateTimePicker } from 'reactables'
import icons from '../constants/icons'
import colors, {highlight, secondary} from '../constants/colors'
import Icon from './Icon'
import Input from './Input'
import merge from 'lodash/merge'
import get from 'lodash/get'
import isString from 'lodash/isString'

const ParameterInput =(
  {
    index,
    choices,
    options,
    value,
    type,
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
        width: 150,
        maxWidth: 150,
        minWidth: 150,
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

  const getOption =(opt)=>{
    return get(opt, 'name', isString(opt) ? opt : '')
  }

  return(
    <div style={ styles.base }>

      <Checkbox
        isChecked={!isDisabled}
        onClick={(isChecked)=> onCheck(index, !isChecked)}
        size={14}
        style={{container:{flex: 0,}}}
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
            key={ i }
            text={getOption(option)}
            value={getOption(option)}
          />
        ) : null}
      </Select>


      {/* Value Dropdown */}

      <ValueInput
        index={index}
        value={value}
        type={type}
        choices={choices}
        param={param}
        onValueUpdate={onValueUpdate}
        onAdd={onAdd}
        style={styles}
      />


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




const ValueInput =({
  type,
  value,
  choices,
  param,
  onValueUpdate,
  onAdd,
  index,
  style
  })=>{

  type = String(type).toLowerCase()

  const selectStyle = merge({}, style.select, {base: {
    width: '100%',
    minWidth: null,
    maxWidth: null,
  }})

  if(choices) return (
    <Select
      style={selectStyle}
      onChange={(val)=> onValueUpdate(index, val)}
      value={ value }
      placeholder={'Choices'}
    >
      {choices.map(choice =>
        <SelectOption
          key={choice}
          text={choice}
          value={choice}
        />
      )}
    </Select>
  )

  switch (type){
    case 'bool':
      return (
        <Select
          style={selectStyle}
          onChange={(val)=> onValueUpdate(index, val)}
          value={ value }
          placeholder={'Bool'}
        >
          <SelectOption
            text={'True'}
            value={true}
          />
          <SelectOption
            text={'False'}
            value={false}
          />
        </Select>
      )
    case 'date':
      return (
        <DateTimePicker
          placeholder={'Date'}
          startDate={value}
          onChange={(val)=> onValueUpdate(index, val)}
        />
      )
  }

  return(
    <Input
      autoFocus
      placeholder={'value'}
      value={value}
      onChange={ (val)=> onValueUpdate(index, val) }
      onClick={()=>{}}
      isDisabled={!param}
      onEnterKey={ onAdd }
    />
  )
}