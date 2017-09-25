import React from 'react'
import { connect } from 'react-redux'
import { Dropdown, DropdownNode, DropdownMenu, DropdownOption, TextField } from 'reactables'
import Toolbar from '../components/Toolbar'
import Icon from '../components/Icon'
import StatusCode from '../components/StatusCode'
import colors, {primaryDark} from '../constants/colors'
import shadows from '../constants/shadows'
import icons from '../constants/icons'

import { myAction} from '../actions/response_client_actions'

class ResponseClient extends React.Component {
  static propTypes = {

  }

  static defaultProps = {

  }

  handleExportClick =()=>{

  }

  render(){

    const payload = this.props.payload
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
          boxShadow: shadows.two
        }
      },
      exportButton:{
        base:{
          height: 36,
          color: primaryDark,
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
            <StatusCode code={200}/>
          ]}
          right={[
            <Dropdown>
              <DropdownNode style={ styles.exportButton }>
                Export <Icon name={icons.arrow_drop_down}/>
              </DropdownNode>
              <DropdownMenu style={ styles.dropdownMenu }>
                <DropdownOption text={'CSV'} value={'csv'} onClick={ this.handleExportClick }/>
                <DropdownOption text={'JSON'} value={'json'} onClick={ this.handleExportClick }/>
                <DropdownOption text={'XML'} value={'xml'} onClick={ this.handleExportClick }/>
              </DropdownMenu>
            </Dropdown>
          ]}
        />
        <div style={ styles.body }>
          <TextField
            onClick={ ()=>this.props.myAction()}
            element={'textarea'}
            value={ this.props.clientResponse }
            style={ styles.textField }
          />
        </div>
      </div>
    )
  }

}

function mapStateToProps(state){
  return{
    ...state.router,
    ...state.responseClient
  }
}
export default connect(mapStateToProps, {

})(ResponseClient)