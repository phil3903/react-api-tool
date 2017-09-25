import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, DropdownNode, DropdownMenu } from 'reactables'
import Icon from '../Icon'
import icons from '../../constants/icons'
import colors from '../../constants/colors'
import { mergeEvents } from '../../helpers/mergeEvents'
import merge from 'lodash/merge'

export default class CardNavDropdown extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    isActive: PropTypes.bool
  }

  constructor(props){
    super(props)
    this.state = {isSelected: false}
  }

  setSelected =()=>{
    const { isActive } = this.props

    if(isActive)
      this.setState({isSelected: !this.state.isSelected})
  }

  closeMenu =()=>{
    this.setState({isSelected: false})
  }

  render(){

    const {text, style, isActive, children, onClick} = this.props

    const styles = {
      base:{
        cursor: 'pointer',
        height: '100%'
      },
      node:{
        base:{
          fontSize: 15,
          height: 48,
          margin: 0,
          color: colors.white,
          backgroundColor: colors.blueGrey[900],
          transition: 'all 0.2s'
        },
        hovered:{
          color: isActive ? colors.white : colors.yellow[600]
        },
        active: {
          color: isActive ? colors.white : colors.yellow[600]
        }
      },
      container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: 3,
      },
      highlight:{
        base:{
          width: '100%',
          height: 4,
          backgroundColor: null
        },
        hovered:{
          //backgroundColor: colors.tealHover,
          //height: 1
        },
        active:{
          backgroundColor: colors.yellow[600]
        }
      }
    }

    merge(styles, style)
    mergeEvents(styles.highlight, {isActive})

    return(
      <li
        onClick={ onClick }
        style={ styles.base }
      >
        <Dropdown
          isActive={ this.state.isSelected }
          onClick={ this.setSelected }
          onClickOutside={ this.closeMenu }
        >
          <DropdownNode style={ styles.node }>
            { text } <Icon name={ icons.arrow_drop_down }/>
          </DropdownNode>
            <DropdownMenu>
              {children}
            </DropdownMenu>
        </Dropdown>
        <div style={ styles.container }>
          <div style={ styles.highlight.base }/>
        </div>
      </li>
    )
  }
}