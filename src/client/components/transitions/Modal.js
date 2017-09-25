import React from 'react'
import Transition from 'react-transition-group/Transition'

const Modal =({ shouldShow, children })=>{

  const animationDuration = 500
  const transitionStyles = {
    entering: { display: 'block'},
    entered:  { display: 'block', opacity: 1, top: 30 },
    exiting: { display: 'block'},
    exited: { display: 'none', opacity: 0, top: 0}
  }

  return(
    <Transition
      in={ !!shouldShow }
      timeout={{ enter: 100, exit: animationDuration}}
    >
      {(state)=> React.cloneElement(children, {
        style: {
          transition: `all ${animationDuration}ms ease`,
          ...children.props.style,
          ...transitionStyles[state]
        }
      })}
    </Transition>
  )
}

export default Modal