import React from 'react'
import PropTypes from 'prop-types'
import merge from 'lodash/merge'
import { Button } from 'reactables'
import Input from '../components/Input'
import {primaryHover, secondary, secondaryHover, highlight, highlightHover, disabled, white, black} from '../constants/colors'
import shadows from '../constants/shadows'
import Modal from './transitions/Modal'
import Label from './Label'

export default class SaveRequestModal extends React.Component {

  static propTypes = {
    isVisible: PropTypes.bool,
    isNameUnique: PropTypes.bool,
    onSave: PropTypes.func,
    onCancel: PropTypes.func,
    onGroupChange: PropTypes.func,
    onNameChange:PropTypes.func,
    name: PropTypes.string,
    group: PropTypes.string,
    style: PropTypes.object
  }

  render() {
    const { isVisible, onSave, onCancel, onGroupChange, onNameChange, name, group, style } = this.props

    const styles = {
      base: {
        display: 'none',
        fontFamily: 'Lato-Light',
        position: 'absolute',
        width: 600,
        marginLeft: -300,
        left: '50%',
        top: 0,
        opacity: 0,
        borderRadius: 2,
        boxShadow: shadows.two,
        zIndex: 1,
      },
      heading: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: secondary,
        borderRadius: '2px 2px 0 0',
        padding: 15
      },
      group:{
        paddingBottom: 30
      },
      main: {
        base: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: primaryHover,
          fontSize: 16,
          padding: 15
        },
        title: {
          fontFamily: 'Lato-Bold',
          marginTop: 15,
          marginBottom: 15,
          fontWeight: 'bold',
          color: white
        },
        body: {
          marginTop: 0,
          marginBottom: 15,
          padding: 0,
          color: white,
          width: '100%'
        }
      },
      actions: {
        display: 'flex',
        borderRadius: '0 0 2px 2px',
      },
      icon: {
        fontSize: 72,
        color: white
      },
      cancelButton:{
        base: {
          width: '100%',
          padding: 15,
          fontSize: 16,
          backgroundColor: secondaryHover,
          borderRadius: '0 0 0 2px',
          color: white
        },
        hovered: {
          backgroundColor: secondary,
        },
      },
      saveButton: {
        base: {
          width: '100%',
          padding: 15,
          fontSize: 16,
          backgroundColor: highlight,
          borderRadius: '0 0 2px 0',
          color: black
        },
        hovered: {
          backgroundColor: highlightHover,
        },
        disabled:{
          backgroundColor: disabled
        }
      }
    }

    merge(styles, style)

    return (
      <Modal shouldShow={ isVisible }>
        <div style={ styles.base }>
          <div style={styles.heading}>
            <i className="material-icons" style={styles.icon}>
              save
            </i>
          </div>
          <div style={styles.main.base}>
            <p style={styles.main.title}>
              Save Request
            </p>
            <div style={styles.main.body}>

              <div style={styles.group}>
                <Label text={'Group'}/>
                <Input value={group} onChange={onGroupChange}/>
              </div>

              <div style={styles.group}>
                <Label text={'Name'}/>
                <Input
                  value={name}
                  onChange={onNameChange}
                  validateOnChange
                  validators={[
                    {
                      rule: ()=> this.props.isNameUnique,
                      errorMessage: "Name is not unique enough."
                    }
                  ]}
                />
              </div>
            </div>
          </div>
          <div style={styles.actions}>
            <Button
              text="Cancel"
              onClick={onCancel}
              style={styles.cancelButton}
            />
            <Button
              text="Save"
              isDisabled={ !group || !name || !this.props.isNameUnique }
              onClick={onSave}
              style={styles.saveButton}
            />
          </div>
        </div>
      </Modal>
    )
  }
}