import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import Icon from './Icon'

export default class NavClose extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  static defaultStyles = {
    base:{
      display: 'flex',
      alignItems: 'center',
      fontWeight: 400,
      fontSize: 28,
      color: 'white',
      transition: 'all 0.3s',
      cursor: 'pointer',
      height: '100%'
    },
    hovered:{
      color: '#fdd835'
    }
  }

  constructor (props){
    super(props)
    this.state = {isHovered: false}
  }

  onClick =()=>{
    window.location = ' '
  }
  onMouseOver =()=>{
    this.setState({isHovered: true})
  }

  onMouseLeave =()=>{
    this.setState({isHovered: false})
  }

  render(){

    const styles = merge({}, NavClose.defaultStyles, this.props.style)
    if(this.state.isHovered) merge(styles.base, styles.hovered)

    return(
      <h1
        style={ styles.base }
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      >
        {this.props.children}
      </h1>
    )
  }
}