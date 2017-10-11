import React from 'react'
import PropTypes from 'prop-types'
import colors from '../../constants/colors'
import { mergeEvents } from '../../helpers/mergeEvents'
import merge from 'lodash/merge'

export default class CardNavLink extends React.Component {

  static propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object,
    isActive: PropTypes.bool,
    isDisabled: PropTypes.bool
  }

  state = { isHovered: false }

  onMouseOver =()=>{
    this.setState({ isHovered: true })
  }

  onMouseLeave =()=>{
    this.setState({ isHovered: false })
  }

  handleClick =()=>{
    const {isDisabled, onClick } = this.props
    if(!isDisabled) onClick()
  }

  render(){

    const {text, style, isActive, isDisabled} = this.props

    const styles = {
      base:{
        cursor: 'pointer',
        height: '100%'
      },
      text:{
        base:{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 13px',
          fontSize: 15,
          height: 48,
          margin: 0,
          color: colors.white,
          transition: 'all 0.2s'
        },
        hovered:{
          color: colors.yellow[600]
        },
        active: {
          color: colors.white
        },
        disabled:{
          color: colors.grey[500],
          cursor: 'default'
        }
      },
      container:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        width: '100%',
        height: 5,
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
        },
        disabled:{
          backgroundColor: null
        }
      }
    }

    merge(styles, style)
    mergeEvents(styles.highlight, {isHovered: this.state.isHovered, isActive, isDisabled})
    mergeEvents(styles.text, {isHovered: this.state.isHovered, isActive, isDisabled})

    return(
      <li
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        onClick={ this.handleClick }
        style={ styles.base }
      >
        <p style={ styles.text.base }>{ text }</p>
        <div style={ styles.container }>
          <div style={ styles.highlight.base }/>
        </div>
      </li>
    )
  }
}