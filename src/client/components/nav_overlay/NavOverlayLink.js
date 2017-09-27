import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class NavOverlayLink extends React.Component {
  static propTypes = {
    to: PropTypes.string,
    text: PropTypes.any
  }

  static defaultProps = {

  }

  static defaultStyles = {
    base:{
      display: 'flex',
      fontSize: 28,
      flexWrap: 'nowrap',
      color: 'white',
      cursor: 'pointer',
      boxSizing: 'border-box',
      transition: 'all 0.3s'
    },
    hovered:{
      color: '#fdd835'
    },
    disabled:{

    },
    active:{
      color: '#fbc02d'
    }
  }

  constructor (props){
    super(props)
    this.state = { isHovered: false }
  }

  onMouseOver =()=>{
    this.setState({ isHovered: true })
  }

  onMouseLeave =()=>{
    this.setState({ isHovered: false })
  }

  onClick = () =>{
    window.location = this.props.to
  }

  render(){
    const styles = merge({}, NavOverlayLink.defaultStyles, this.props.style)
    if(this.state.isHovered) merge(styles.base, styles.hovered)
    if(this.props.isActive) merge(styles.base, styles.active)

    return(
      <span
        style={styles.base}
        onMouseOver={ this.onMouseOver }
        onMouseLeave={ this.onMouseLeave }
        onClick={ this.onClick }
      >
        {this.props.children}
      </span>
    )
  }
}