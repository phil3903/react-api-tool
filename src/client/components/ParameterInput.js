import React from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, DropdownNode, DropdownMenu, DropdownOption, TextField } from 'reactables'
import icons from '../constants/icons'
import colors, {primaryDark} from '../constants/colors'
import shadows from '../constants/shadows'
import Icon from './Icon'

const ParameterInput =(
  {index, keyOptions, value, param, onAdd, onKeyUpdate, onValueUpdate, onDelete, listLength}
  )=>{
  
  const styles = {
    base:{
      display: 'flex',
      alignItems: 'center',
      height: 36,
      width: '100%',
      marginBottom: 30
    },
    dropdownNode:{
      base:{
        display: 'flex',
        justifyContent: 'space-between',
        width: 150,
        marginRight: 10,
        backgroundColor: 'transparent',
        borderBottom: `1px solid ${primaryDark}`,
        color: colors.white,
        borderRadius: 0,
        height: 40,
        fontSize: 16,
      },
      active:{
        borderBottom: `1px solid ${colors.yellow[600]}`,
      }
    },
    dropdownMenu:{
      base:{
        boxShadow: shadows.two,
        borderRadius: 2
      }
    },
    dropdownOption:{
      base:{
        color: colors.black
      }
    },
    textField:{
      input:{
        base:{
          border: 'none',
          borderBottom: `1px solid ${primaryDark}`,
          borderColor: primaryDark,
          color: colors.white,
          fontSize: 16,
          borderRadius: 0,
        },
        focused:{
          borderColor: colors.yellow[600]
        },
        blur:{
          borderColor: primaryDark,
        }
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
        color: primaryDark,
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
      <Dropdown>
        <DropdownNode style={ styles.dropdownNode }>
          { param || 'Parameter' } <Icon name={icons.arrow_drop_down}/>
        </DropdownNode>
        <DropdownMenu>
          {keyOptions ? keyOptions.map(option =>
            <DropdownOption
              style={ styles.dropdownOption }
              key={option}
              text={option}
              value={option}
              onClick={ (value)=> onKeyUpdate(index, value) }
            />
          ) : null}
        </DropdownMenu>
      </Dropdown>
      <TextField
        autoFocus
        placeholder={'value'}
        style={ styles.textField }
        value={value}
        onChange={ (value)=> onValueUpdate(index, value) }
        onEnterKey={ onAdd }
      />
      <div style={styles.deleteContainer}>
        <Button
          style={ styles.deleteButton }
          text={<Icon name={icons.delete_forever} />}
          isDisabled={ listLength <= 1}
          onClick={ ()=> onDelete(index) }
        />
      </div>
    </div>
  )
}

export default ParameterInput 