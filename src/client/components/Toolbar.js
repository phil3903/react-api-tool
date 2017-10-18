import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import get from 'lodash/get'
import colors, {secondary} from '../constants/colors'

const Toolbar =({left, right, backgroundColor, height})=>{
  const styles = {
    base:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxSizing: 'border-box',
      //borderBottom: `1px solid ${colors.grey[500]}`,
      backgroundColor: backgroundColor || secondary,
      height,
    },
    left:{
      container:{
        flex: 1,
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        color: colors.white
      },
      element:{
        base:{
          marginLeft: 10,
        },
        last:{

        }
      }
    },
    right:{
      container:{
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        color: colors.white
      },
      element:{
        base:{
          marginRight: 10,
        },
        last:{

        }
      }
    }
  }

  const mergeStyles =(elem, style, isLast)=>{
    return merge({},
      get(elem, 'props.style'),
      style,
      isLast ?  style.last : {}
    )
  }

  return(
    <div style={ styles.base }>
      <div style={ styles.left.container }>
        { left.map((elem, i) =>
          React.cloneElement(elem, {
            key: i,
            style: mergeStyles(elem, styles.left.element, (i+1) === get(left, 'length', 0))
          })
        )}
      </div>
      <div style={ styles.right.container }>
        { right.map((elem, i) =>
          React.cloneElement(elem, {
            key: i,
            style: mergeStyles(elem, styles.right.element, (i+1) === get(right, 'length', 0))
          })
        )}
      </div>
    </div>
  )
}

Toolbar.propTypes = {
  left: PropTypes.array,
  right: PropTypes.array
}

Toolbar.defaultProps = {
  left: [],
  right: []
}

export default Toolbar