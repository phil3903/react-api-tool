import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, DropdownNode, DropdownMenu, DropdownOption, TextField } from 'reactables'
import ExportWizard from '../components/ExportWizard'
import Toolbar from '../components/Toolbar'
import Icon from '../components/Icon'
import StatusCode from '../components/StatusCode'
import ResponseTime from '../components/ResponseTime'
import CardNav from '../components/card_nav/CardNav'
import CardNavLink from '../components/card_nav/CardNavLink'
import CardNavDropdown from '../components/card_nav/CardNavDropdown'
import colors, {secondary} from '../constants/colors'
import shadows from '../constants/shadows'
import icons from '../constants/icons'
import * as fileExporter from '../services/file_exporter'
import * as responseActions from '../actions/response_client_actions'
import * as exportActions from '../actions/export_response_actions'

class ResponseClient extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  handleExport =(type, name, fields)=>{
    const { payload } = this.props
    fileExporter.download(type, payload, name, fields)
  }


  render(){

    const { payload, exportType, subnav, clientResponse } = this.props
    const isExportDisabled = !clientResponse || !clientResponse.length

    const styles = {
      base:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        borderBottom: `1px solid ${colors.grey[500]}`
      },
      body:{
        flex: 1,
        display: 'flex',
        backgroundColor: colors.blueGrey[900],
        color: colors.white,
        overflowY: 'auto'
      },
      textField:{
        input:{
          base:{
            whiteSpace: 'nowrap',
            padding: 5,
            fontFamily: 'monospace',
            fontSize: 14,
            color: colors.white,
            border: 'none',
            borderColor: null
          },
          focus:{
            borderColor: null,
            border: null
          }
        },
      },
      dropdownMenu:{
        base:{
          boxShadow: shadows.two,
          color: colors.black
        }
      },
      exportButton:{
        base:{
          height: 36,
          color: secondary,
          backgroundColor: colors.yellow[600]
        },
        hovered:{
          backgroundColor: colors.yellow[400]
        }
      }
    }

    return (
      <div style={styles.base}>
        <Toolbar
          height={60}
          left={[
            <StatusCode code={this.props.statusCode}/>
          ]}
          right={[
            <ResponseTime time={this.props.responseTime}/>
          ]}
        />
        <CardNav>
          <CardNavLink
            text={'Response'}
            onClick={()=> this.props.setSubnav('response')}
            isActive={subnav === 'response'}/>

          <CardNavLink
            text={'Export'}
            onClick={()=> this.props.setSubnav('export')}
            isActive={subnav === 'export'}
            isDisabled={ isExportDisabled }
          />

        </CardNav>
        <div style={ styles.body }>
          {subnav === 'response' ?
            <TextField
              onClick={ ()=>{} }
              element={'textarea'}
              value={ clientResponse }
              style={ styles.textField }
            /> : null }

          { subnav === 'export'
            ? <ExportWizard
                format={this.props.exportFormat}
                columns={this.props.exportColumns}
                paths={this.props.exportPaths}
                updateFormat={this.props.updateExportFormat}
                addColumn={this.props.addColumn}
                deleteColumn={this.props.deleteColumn}
                updateColumnKey={this.props.updateColumnKey}
                updateColumnValue={this.props.updateColumnValue}
                executeExport={this.props.executeExportResponse}
            />
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
    ...state.responseClient,
    exportFormat: state.exportResponse.format,
    exportColumns: state.exportResponse.columns,
    exportPaths: state.responseClient.paths
  }
}
export default connect(mapStateToProps, {
  setSubnav: responseActions.setSubnav,
  updateExportFormat: exportActions.updateFormat,
  addColumn: exportActions.addColumn,
  deleteColumn: exportActions.deleteColumn,
  updateColumnKey: exportActions.updateColumnKey,
  updateColumnValue: exportActions.updateColumnValue,
  executeExportResponse: exportActions.executeExportResponse,

})(ResponseClient)