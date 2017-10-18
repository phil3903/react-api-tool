import React from 'react'
import PropTypes from 'prop-types'
import colors, { secondary } from '../../constants/colors'
import merge from 'lodash/merge'

export default class CardNav extends React.Component {

  static propTypes = {
    style: PropTypes.object
  }

  render(){

    const { style, children } = this.props

    const styles = {
      base:{
        display: 'flex',
        width: '100%',
        listStyle: 'none',
        height: 52,
        margin: 0,
        padding: 0,
        backgroundColor: colors.blueGrey[900],
        borderBottom: `1px solid ${ secondary }`,
        boxSizing: 'border-box'
      }
    }

    merge(styles, style)

    return(
      <ul style={ styles.base }>
        { children }
      </ul>
    )
  }
}