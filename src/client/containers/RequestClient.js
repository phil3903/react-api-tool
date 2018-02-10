import React from 'react'
import { connect } from 'react-redux'
import { TextField, Dropdown, DropdownNode, DropdownMenu, DropdownOption } from 'reactables'
import * as requestActions from '../actions/request_client_actions'
import { showModal as showSaveModal } from '../actions/save_request_actions'
import { loadEnvironment, loadRoute } from '../actions/docs_actions'
import colors, {secondary} from '../constants/colors'
import icons from '../constants/icons'
import DropdownButton from '../components/DropdownButton'
import CardNav from '../components/card_nav/CardNav'
import CardNavLink from '../components/card_nav/CardNavLink'
import CardNavDropdown from '../components/card_nav/CardNavDropdown'
import Toolbar from '../components/Toolbar'
import Icon from '../components/Icon'
import SegmentedUrlBar from '../components/SegmentedUrlBar'
import {FormRequestView, AuthRequestView, JsonRequestView }from '../components/request_views/index'
import ParamsRequestView from '../components/request_views/ParamsRequestView'


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
          borderRight: `1px solid ${secondary}`,
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
          color: secondary,
          backgroundColor: colors.yellow[600],
          boxSizing: 'border-box'
        },
        hovered:{
          backgroundColor: colors.yellow[400]
        }
      }
    }

    const { requestFormat, requestFormatDisplay, subnav, route } = this.props

    const isFormViewActive =   subnav === 'format' && requestFormat === 'form'
    const isJsonViewActive =   subnav === 'format' && requestFormat === 'json'
    const isParamsViewActive = subnav === 'params'
    const isAuthViewActive =   subnav === 'auth'

    return (
      <div style={styles.base}>
        <Toolbar
          height={60}
          left={[
            <TextField
              value={this.props.urlInput}
              onChange={this.handleUpdateUrlInput}
              style={ styles.textField }
              appendExtension={'left'}
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
                    { ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].map(method =>
                      <DropdownOption
                        style={styles.dropdownOption }
                        key={method}
                        text={method}
                        value={method}
                        onClick={this.handleUpdateUrlMethod}
                      />
                    )}
                  </DropdownMenu>
                </Dropdown>
              }
            />
          ]}
          right={[
            <DropdownButton
              onSend={this.props.executeSendRequest}
              onSave={this.props.showSaveModal}
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
            text={'Params'}
            isDisabled={false}
            onClick={()=> this.props.setSubnav('params')}
            isActive={subnav === 'params'}/>

          {/*<CardNavLink*/}
            {/*text={'Auth'}*/}
            {/*onClick={()=> this.props.setSubnav('auth')}*/}
            {/*isActive={subnav === 'auth'}/>*/}

        </CardNav>
        <div style={ styles.body }>
          { isFormViewActive
            ? <FormRequestView
                isActive={ isFormViewActive }
                formList={this.props.formList}
                options={ route.query || route.body || [] }
                onAdd={ this.props.addFormParameter }
                onKeyUpdate={ this.props.updateFormParameterKey }
                onValueUpdate={ this.props.updateFormParameterValue }
                onDelete={ this.props.deleteFormParameter }
                onCheckParameter={this.props.disableFormParameter}
            />
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

          { isParamsViewActive
            ? <ParamsRequestView
              isActive={ isParamsViewActive }/>
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
  disableFormParameter: requestActions.disableFormParameter,
  setSubnav: requestActions.setSubnav,
  setRequestFormat: requestActions.setRequestFormat,
  updateJsonInput: requestActions.updateJsonInput,
  setJsonValidation: requestActions.setJsonValidation,
  showSaveModal,
  loadEnvironment,
  loadRoute
})(RequestClient)