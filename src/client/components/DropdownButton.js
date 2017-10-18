import React from 'react'
import {Button, Dropdown, DropdownNode, DropdownMenu, DropdownOption} from 'reactables'
import Icon from './Icon'
import icons from '../constants/icons'
import colors, {secondary} from '../constants/colors'

const DropdownButton =({onSend, onSave, isDisabled})=>{

  const styles = {
    base:{
      display: 'flex',
      flexWrap: 'nowrap'
    },
    sendButton:{
      base:{
        height: 36,
        color: secondary,
        backgroundColor: colors.yellow[600],
        boxSizing: 'border-box',
        borderRadius: '2px 0 0 2px'
      },
      hovered:{
        backgroundColor: colors.yellow[400]
      },
      disabled:{
        backgroundColor: colors.grey[800]
      }
    },
    dropdownNode:{
      base:{
        padding: 0,
        margin: 0,
        marginRight: 10,
        borderRadius: '0 2px 2px 0',
        backgroundColor: colors.yellow[600],
        color: colors.black,
        borderLeft: `1px solid ${secondary}`
      },
      hovered:{
        backgroundColor: colors.yellow[400],
      },
      disabled:{
        backgroundColor: colors.grey[800]
      }
    },
    dropdownOption:{
      base:{
        color: colors.black
      }
    }
  }
  return(
    <span style={styles.base}>
      <Button
        text={'Send'}
        onClick={ onSend }
        style={ styles.sendButton }
        isDisabled={isDisabled}
      />
      <Dropdown>
        <DropdownNode
          style={ styles.dropdownNode }
          isDisabled={isDisabled}
        >
          <Icon name={icons.arrow_drop_down}/>
        </DropdownNode>
        <DropdownMenu justify={'right'}>
          <DropdownOption text={'Save'} value={'save'} style={ styles.dropdownOption } onClick={onSave}/>
        </DropdownMenu>
      </Dropdown>
    </span>
  )
}

export default DropdownButton