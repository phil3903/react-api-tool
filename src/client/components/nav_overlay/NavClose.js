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
      marginRight: null,
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s'
    },
    hovered:{
      color: '#fdd835'
    }
  }

  constructor (props){
    super(props)
    this.state = {isHovered: false}
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
      <Icon
        name={'close'}
        onClick={this.props.onClose}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        style={styles}
      />
    )
  }
}