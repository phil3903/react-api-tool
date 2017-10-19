import React from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import get from 'lodash.get'


export default class Expand extends React.Component {

  static propTypes = {
    shouldAnimate: PropTypes.bool,
    appear: PropTypes.bool,
    duration: PropTypes.number,
    children: PropTypes.node,
    staggerTime: PropTypes.number,
    onAnimationEnd: PropTypes.func
  }

  static defaultProps = {
    appear: false,
    shouldAnimate: false,
    duration: 300,
    height: null,
    staggerTime: 0,
    onAnimationEnd: ()=>{}
  }

  componentWillReceiveProps(nextProps){
    const shouldEmit = this.props.shouldAnimate !== nextProps.shouldAnimate
    if(shouldEmit) {
      this.handleEmit(nextProps.shouldAnimate)
    }
  }

  handleEmit =(shouldMount)=>{
    const { onAnimationEnd, staggerTime, duration } = this.props
    clearTimeout(this.timer)
    this.timer = setTimeout(() => onAnimationEnd(shouldMount), staggerTime + duration)
  }

  render() {
    const { shouldAnimate, appear, children, staggerTime, duration, height} = this.props

    //const height = get(children, `props.style.height`)
    const styles = {transition: `height ${duration}ms`, overflow: 'hidden'}
    const timeout = {enter: staggerTime, exit: staggerTime}
    const transitionStyles = {
      entering: {height: 0},
      entered: {height},
      exiting: {height},
      exited: {height: 0}
    }

    return (
      <Transition
        in={shouldAnimate}
        appear={ appear }
        timeout={ timeout }
      >
        {(state) => React.cloneElement(children, {
          style: {
            ...styles,
            ...transitionStyles[state]
          }
        })}
      </Transition>
    )
  }
}