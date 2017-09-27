import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import NavOverlayBar from './NavOverlayBar'
import NavClose from './NavClose'
import NavTitle from './NavTitle'
import Icon from './Icon'
import Slide from './Slide'

const NavOverlay = ({children, isVisible, onClose, style}) =>{

  const styles = merge({}, NavOverlay.defaultStyles, style)
  if(isVisible) merge(styles.overlay.base, styles.overlay.visible)


  return(
    <div style={ styles.overlay.base }>
      <div style={ styles.container.base }>
        <NavOverlayBar>
          <NavTitle>

            <Slide shouldAnimate={isVisible}>
              <Icon name={'trending_down'} size={30} style={{base:{marginLeft: 10}}}/>
            </Slide>
          </NavTitle>
          <NavClose onClose={onClose}/>
        </NavOverlayBar>
        { children.map((child, i)=>
          <div
            key={i}
            style={styles.linkContainer.base}
          >
            { child }
          </div>
        ) }
      </div>
    </div>
  )
}

NavOverlay.defaultStyles = {
  overlay:{
    base:{
      position: 'absolute',
      visibility: 'hidden',
      overflowY: 'auto',
      backgroundColor: 'rgba(0,0,0,0)',
      padding: 10,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 10000000,
      opacity: 0,
      transition: 'all 0.3s'
    },
    visible:{
      visibility: 'visible',
      opacity: null,
      backgroundColor: 'rgba(0,0,0,0.9)',
    }
  },
  container:{
    base:{
      position: 'relative',
      padding: 60,
      display: 'flex',
      flexWrap: 'wrap',
      //justifyContent: 'center'
    }
  },
  linkContainer:{
    base:{
      flex: 1,
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      padding: 60,
      minWidth: 300,
      maxWidth: 400,
      maxHeight: 200,
      minHeight: 200,
      boxSizing: 'border-box'
    }
  }
}

NavOverlay.propsTypes = {
  isVisible: PropTypes.bool
}

NavOverlay.defaultProps = {
  isVisible: false
}

export default NavOverlay