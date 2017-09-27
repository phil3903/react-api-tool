import React from 'react'
import NavOverlay from './NavOverlay'
import NavOverlayLink from './NavOverlayLink'
import Icon from './Icon'
import Text from './Text'

const TDNavOverlay =({isVisible, onClose})=>{
  return(
    <NavOverlay isVisible={isVisible} onClose={onClose}>
      <NavOverlayLink to={''}>
        <Icon name={'mail_outline'}/>
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink to={''}>
        <Icon name={'view_quilt'} />
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink to={''}>
        <Icon name={'fingerprint'} />
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink to={''}>
        <Icon name={'build'} />
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink to={''}>
        <Icon name={'insert_drive_file'} />
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink to={''}>
        <Icon name={'verified_user'} />
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink to={''}>
        <Icon name={'https'} />
        <Text></Text>
      </NavOverlayLink>
      <NavOverlayLink />
      <NavOverlayLink />
      <NavOverlayLink />
    </NavOverlay>
  )
}

export default TDNavOverlay