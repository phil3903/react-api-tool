import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'

export default class Slide extends React.Component{

  static propTypes = {
    children: PropTypes.element.isRequired,
    shouldAnimate: PropTypes.bool
  }

  static defaultProps = {
    shouldAnimate: false
  }

  render() {

    const styles = {
      base:{
        position: 'relative',
        height: '100%'
      },
      slide:{
        base:{
          position: 'absolute',
          top: -500,
          transition: 'top 0.3s',
          transitionDelay: '0.2s'
        },
        animation:{
          top: 12
        }
      }
    }

    if(this.props.shouldAnimate)
      merge(styles.slide.base, styles.slide.animation)

    return (
      <div style={ styles.base }>
          <div style={styles.slide.base}>
            {this.props.children}
          </div>
      </div>
    )
  }
}