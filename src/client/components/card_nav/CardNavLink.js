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
    isActive: PropTypes.bool
  }

  state = { isHovered: false }

  onMouseOver =()=>{
    this.setState({ isHovered: true })
  }

  onMouseLeave =()=>{
    this.setState({ isHovered: false })
  }

  render(){

    const {text, style, isActive, onClick} = this.props

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
        }
      }
    }

    merge(styles, style)
    mergeEvents(styles.highlight, {isHovered: this.state.isHovered, isActive})
    mergeEvents(styles.text, {isHovered: this.state.isHovered, isActive})

    return(
      <li
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        onClick={ onClick }
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