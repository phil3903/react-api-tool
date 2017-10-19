import React from 'react'
import PropTypes from 'prop-types'
import {Badge} from 'reactables'
import merge from 'lodash/merge'
import Icon from '../Icon'
import icons from '../../constants/icons'
import colors, { highlight, secondary } from '../../constants/colors'


export default class RouteHeading extends React.Component{
  static propTypes = {
    heading: PropTypes.string,
    routes: PropTypes.array,
    isSaved: PropTypes.bool
  }

  constructor (props){
    super(props)
    this.state = { isHovered: false }
  }
  render(){
    const styles = {
      base:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: secondary,
        color: colors.white,
        borderBottom: `1px solid ${colors.blueGrey[900]}`,
        height: 40,
        padding: '0 14px 0 10px',
        boxSizing: 'border-box',
        zIndex: 1
      },
      hovered:{
        backgroundColor: colors.blueGrey[700]
      }
    }

    const groupStyles = {
      display: 'flex',
      alignItems: 'center'
    }
    const iconStyles = {
      color: highlight,
      borderRadius: 2,
      padding: '0 3px',
      marginRight: 10
    }


    const { heading, isExpanded, isSaved, onClick } = this.props
    if(this.state.isHovered) merge(styles.base, styles.hovered)

    return(
      <div
        style={ styles.base }
        onMouseOver={ ()=> this.setState({isHovered: true})}
        onMouseLeave={ ()=> this.setState({isHovered: false})}
        onClick={ onClick }
      >
        <span style={ groupStyles }>
          { isSaved ? <Icon name={icons.star} size={20} style={ iconStyles }/> : null }
          <span>{heading}</span>
        </span>

        <Icon size={16} name={ isExpanded ? icons.remove : icons.add } />
      </div>
    )
  }
}