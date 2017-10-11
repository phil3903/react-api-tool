import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from 'reactables'
import colors from '../../constants/colors'

export default class JsonRequestView extends React.Component {

  validate =(value)=>{

    if(!value || !value.length){
      this.props.onValidate(true)
      return true
    }

    try { JSON.parse(value) }
    catch (e) {
      this.props.onValidate(false)
      return false
    }

    this.props.onValidate(true)
    return true
  }

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
      },
      errorMessage:{
        base:{
          top: 5,
          right: 5
        }
      }

    }
    return (
      <TextField
        validateOnMount={true}
        validateOnChange={true}
        validators={[
          {
            errorMessage: 'Invalid JSON',
            rule: this.validate
          }]
        }
        shouldAllowTab
        element={'textarea'}
        value={value}
        onChange={onChange}
        style={styles}
      />
    )
  }
}
