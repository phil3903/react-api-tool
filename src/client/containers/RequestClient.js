import React from 'react'
import { connect } from 'react-redux'
import { TextField, Dropdown, DropdownNode, DropdownMenu, DropdownOption } from 'reactables'
import * as requestActions from '../actions/request_client_actions'
import { loadEnvironment, loadRoute } from '../actions/docs_actions'
import colors, {primaryDark} from '../constants/colors'
import icons from '../constants/icons'
import DropdownButton from '../components/DropdownButton'
import CardNav from '../components/card_nav/CardNav'
import CardNavLink from '../components/card_nav/CardNavLink'
import CardNavDropdown from '../components/card_nav/CardNavDropdown'
import Toolbar from '../components/Toolbar'
import Icon from '../components/Icon'
import {FormRequestView, AuthRequestView, JsonRequestView }from '../components/request_views/index'


class RequestClient extends React.Component {

  handleUpdateUrlMethod =(method)=>{
    this.props.updateUrlMethod(method)
  }

  handleUpdateUrlInput =(input)=>{
    this.props.updateUrlInput(input)
  }

  shouldDisableRequest =()=> {
    const {requestFormat, urlInput, urlMethod, isJsonValid} = this.props

    if (!urlInput || !urlMethod) return true
    if (requestFormat === 'json' && !isJsonValid) return true

    return false
  }

  render(){
    const styles = {
      base:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      },
      body:{
        flex: 1,
        backgroundColor: colors.blueGrey[900],
        color: colors.white,

      },
      textField:{
        wrapper:{
          base:{
            height: 36,
            padding: '0 10px'
          }
        },
        input:{
          base:{
            color: colors.white,
            backgroundColor: colors.blueGrey[900],
            border: 'none',
            fontSize: 14
          }
        }
      },
      dropdownNode:{
        base:{
          backgroundColor: colors.blueGrey[900],
          color: colors.white,
          borderRight: `1px solid ${primaryDark}`,
        }
      },
      dropdownOption:{
        base:{
          color: colors.black
        }
      },
      sendButton:{
        base:{
          height: 36,
          color: primaryDark,
          backgroundColor: colors.yellow[600],
          boxSizing: 'border-box'
        },
        hovered:{
          backgroundColor: colors.yellow[400]
        }
      }
    }

    const { requestFormat, requestFormatDisplay, subnav, route } = this.props

    const isFormViewActive = subnav === 'format' && requestFormat === 'form'
    const isJsonViewActive = subnav === 'format' && requestFormat === 'json'
    const isAuthViewActive = subnav === 'auth'

    return (
      <div style={styles.base}>
        <Toolbar
          height={60}
          left={[
            <TextField
              value={ this.props.urlInput }
              style={ styles.textField }
              appendExtension={'left'}
              onChange={ this.handleUpdateUrlInput }
              extension={
                <Dropdown>
                  <DropdownNode style={ styles.dropdownNode }>
                    { this.props.urlMethod
                      ? this.props.urlMethod.toUpperCase()
                      : 'Method'
                    }
                    <Icon name={icons.arrow_drop_down}/>
                  </DropdownNode>
                  <DropdownMenu>
                    <DropdownOption style={styles.dropdownOption } text={'GET'} value={'GET'} onClick={this.handleUpdateUrlMethod}/>
                    <DropdownOption style={styles.dropdownOption } text={'POST'} value={'POST'} onClick={this.handleUpdateUrlMethod}/>
                    <DropdownOption style={styles.dropdownOption } text={'PUT'} value={'PUT'} onClick={this.handleUpdateUrlMethod}/>
                    <DropdownOption style={styles.dropdownOption } text={'DELETE'} value={'DELETE'} onClick={this.handleUpdateUrlMethod}/>
                  </DropdownMenu>
                </Dropdown>
              }
            />
          ]}
          right={[
            <DropdownButton
              onSend={this.props.executeSendRequest}
              onSave={this.props.executeSaveRequest}
              isDisabled={ this.shouldDisableRequest() }
            />
          ]}
        />
        <CardNav>
          <CardNavDropdown
            text={ requestFormatDisplay || 'Format'}
            isActive={subnav === 'format'}
            onClick={ ()=> this.props.setSubnav('format')}
          >
            <DropdownOption
              text={'Form'}
              value={'form'}
              onClick={ (value)=> this.props.setRequestFormat(value, 'Form') }/>
            <DropdownOption
              text={'JSON'}
              value={'json'}
              onClick={ (value)=>this.props.setRequestFormat(value, 'JSON') }/>
          </CardNavDropdown>
          <CardNavLink
            text={'Auth'}
            onClick={()=> this.props.setSubnav('auth')}
            isActive={subnav === 'auth'}/>
        </CardNav>
        <div style={ styles.body }>
          { isFormViewActive
            ? <FormRequestView
                isActive={ isFormViewActive }
                formParameterList={this.props.formParameterList}
                keyOptions={ route.params || route.body }
                onAdd={ this.props.addFormParameter }
                onKeyUpdate={ this.props.updateFormParameterKey }
                onValueUpdate={ this.props.updateFormParameterValue }
                onDelete={ this.props.deleteFormParameter }/>
            : null
          }
          { isJsonViewActive
            ? <JsonRequestView
                isActive={ isJsonViewActive }
                value={ this.props.jsonInput }
                onValidate={ this.props.setJsonValidation }
                onChange={ this.props.updateJsonInput }/>
            : null
          }
          { isAuthViewActive
            ? <AuthRequestView
              isActive={ isAuthViewActive }/>
            : null
          }
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return{
    ...state.router,
    ...state.requestClient,
    environment: state.docs.selectedEnvironment,
    route: state.docs.selectedRoute,
  }
}
export default connect(mapStateToProps, {
  executeSaveRequest: requestActions.executeSaveRequest,
  executeSendRequest: requestActions.executeSendRequest,
  updateUrlInput: requestActions.updateUrlInput,
  updateUrlMethod: requestActions.updateUrlMethod,
  addFormParameter: requestActions.addFormParameter,
  deleteFormParameter: requestActions.deleteFormParameter,
  updateFormParameterKey: requestActions.updateFormParameterKey,
  updateFormParameterValue: requestActions.updateFormParameterValue,
  setSubnav: requestActions.setSubnav,
  setRequestFormat: requestActions.setRequestFormat,
  updateJsonInput: requestActions.updateJsonInput,
  setJsonValidation: requestActions.setJsonValidation,
  loadEnvironment,
  loadRoute
})(RequestClient)