import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import colors, {secondary} from '../../constants/colors'
import RouteDelete from './RouteDelete'
import Icon from '../Icon'
import icons from '../../constants/icons'

export default class Route extends React.Component {
  static propTypes = {
    isHidden: PropTypes.bool,
    isSaved: PropTypes.bool,
    displayName: PropTypes.string,
    method: PropTypes.oneOf(['get', 'post', 'put', 'delete']),
    onClick: PropTypes.func,
    onDelete: PropTypes.func
  }
  constructor (props){
    super(props)
    this.state = { isHovered: false, isDeleteVisible: false }
  }

  handleIconClick =(e)=>{
    e.stopPropagation()
    this.setState({ isDeleteVisible: true })
  }

  handleCancelClick =(value, e)=>{
    e.stopPropagation()
    this.setState({ isDeleteVisible: false})
  }

  handleDeleteClick =(value, e)=>{
    e.stopPropagation()
    this.props.onDelete()
  }

  render(){
    const { method, displayName, isHidden, onClick } = this.props

    const styles = {
      base:{
        position: 'relative',
        height: 40,
        boxSizing: 'border-box',
        pointerEvents: isHidden ? 'none' : null,

      },
      cell:{
        base: {
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.blueGrey[900],
          borderBottom: `1px solid ${secondary}`,
          color: colors.white,
          padding: '0 14px 0 10px',
          boxSizing: 'border-box',
          fontSize: 14,
          top: 0,
          left: 0,
          zIndex: 1,
          transition: 'left 0.5s'
        },
        hovered:{
          backgroundColor: colors.blueGrey[700]
        }
      }
    }

    const textStyles = {
      display:{
        display: 'flex',
        alignItems: 'center'
      },
      name:{
        padding: 0,
        margin: 0,
        maxWidth: 120,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      },
      method: {
        get: {color: colors.green[500]},
        post: {color: colors.purple[500]},
        put: {color: colors.blue[500]},
        delete: {color: colors.red[500]}
      }
    }

    if(this.state.isHovered)
      merge(styles.cell.base, styles.cell.hovered)

    if(this.state.isDeleteVisible)
      merge(styles.cell.base, {left: -250})

    return(
        <div style={ styles.base }>
          <div
            style={ styles.cell.base }
            onClick={ onClick }
            onMouseOver={ ()=> this.setState({isHovered: true})}
            onMouseLeave={ ()=> this.setState({isHovered: false})}
          >
            <span style={ textStyles.method[method] }>
              { method.toUpperCase() }
            </span>
            <span style={ textStyles.display }>
              <p style={ textStyles.name } title={displayName}>{displayName}</p>
              { this.props.isSaved
                ? <Icon
                  name={icons.delete_forever}
                  size={18}
                  style={{paddingLeft: 5}}
                  onClick={ this.handleIconClick }
                />
                : null
              }
            </span>
          </div>
          <RouteDelete
            onDelete={ this.handleDeleteClick }
            onCancel={ this.handleCancelClick }
          />
        </div>
    )
  }
}