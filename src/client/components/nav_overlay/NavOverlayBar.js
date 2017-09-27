import React from 'react'

const NavOverlayBar =({children})=>{
  return(
    <div style={ NavOverlayBar.defaultStyles.base }>
      { children }
    </div>
  )
}

NavOverlayBar.defaultStyles = {
  base:{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'black',
    boxSizing: 'border-box',
  }
}

export default NavOverlayBar