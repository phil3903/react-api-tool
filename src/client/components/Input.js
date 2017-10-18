import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'reactables'
import { secondary, highlight, white } from '../constants/colors'

export default class Input extends React.Component {

  static propTypes = TextField.propTypes
  static defaultProps = TextField.defaultProps

  render() {
    const styles = {
      input: {
        base: {
          width: '100%',
          border: 'none',
          borderBottom: `1px solid ${secondary}`,
          borderColor: secondary,
          color: white,
          fontSize: 16,
          borderRadius: 0,
        },
        focused: {
          borderColor: highlight
        },
        blur: {
          borderColor: secondary,
        },
        disabled: {
          borderBottom: `1px solid ${secondary}`
        }
      }
    }

    return (
      <TextField style={styles} {...this.props} />
    )
  }
}
