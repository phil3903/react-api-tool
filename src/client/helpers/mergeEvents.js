import merge from 'lodash/merge'

export const mergeEvents = (styles, events) =>{

  const { isDisabled, isActive, isHovered } = events

  if(isDisabled)
    return merge(styles.base, styles.disabled)

  if(isActive)
    return merge(styles.base, styles.active)

  if(isHovered)
    return merge(styles.base, styles.hovered)

}