import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from 'reactables'
import colors from '../../constants/colors'

export default class JsonRequestView extends React.Component {

  render() {
    const {value, onChange, isActive} = this.props
    if (!isActive) return null
    const styles = {
      wrapper: {
        base: {
          height: '100%'
        }
      },
      input: {
        base: {
          whiteSpace: 'nowrap',
          fontFamily: 'monospace',
          fontSize: 14,
          color: colors.white,
          border: 'none',
          borderColor: null,
          padding: 5,
          tabSize: 2
        },
        focus: {
          borderColor: null,
          border: null
        }

      }

    }
    return (
      <TextField
        autoFocus
        shouldAllowTab
        element={'textarea'}
        value={value}
        onChange={onChange}
        style={styles}
      />
    )
  }
}
