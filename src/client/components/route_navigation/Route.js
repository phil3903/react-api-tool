import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import colors, {primaryDark} from '../../constants/colors'
import { Badge } from 'reactables'

export default class Route extends React.Component {
  static propTypes = {
    isHidden: PropTypes.bool,
    displayName: PropTypes.string,
    method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
    onClick: PropTypes.func,

  }
  constructor (props){
    super(props)
    this.state = { isHovered: false }
  }

  render(){
    const { method, displayName, isHidden, onClick } = this.props

    const styles = {
      base:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.blueGrey[900],
        color: colors.white,
        borderBottom: `1px solid ${primaryDark}`,
        height: 40,
        padding: '0 14px 0 10px',
        boxSizing: 'border-box',
        pointerEvents: isHidden ? 'none' : null,
        fontSize: 14
      },
      hovered:{
        backgroundColor: colors.blueGrey[700]
      }
    }

    const textStyles = {
      displayName:{

      },
      method: {
        get: {color: colors.green[500]},
        post: {color: colors.purple[500]},
        put: {color: colors.blue[500]},
        delete: {color: colors.red[500]}
      }
    }

    if(this.state.isHovered)
      merge(styles.base, styles.hovered)

    return(
      <div
        style={ styles.base }
        onMouseOver={ ()=> this.setState({isHovered: true})}
        onMouseLeave={ ()=> this.setState({isHovered: false})}
        onClick={ onClick }
      >
        <span style={ textStyles.method[method] }>
          { method.toUpperCase() }
        </span>
        <span style={ textStyles.displayName }>
          {displayName}
        </span>
      </div>
    )
  }
}